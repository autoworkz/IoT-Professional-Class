import re

def extract_block_with_tag(content, marker_comment):
    """
    Finds a block starting with a specific comment, identifies the next opening tag,
    and extracts everything up to its matching closing tag.
    Returns (extracted_text, start_index, end_index).
    """
    marker_match = re.search(re.escape(marker_comment), content)
    if not marker_match:
        return None, -1, -1
    
    start_pos = marker_match.start()
    
    # Find the first opening tag after the marker
    tag_start_search = re.search(r'<div', content[start_pos:])
    if not tag_start_search:
        return None, -1, -1
    
    content_start_index = start_pos + tag_start_search.start()
    
    open_tags = 0
    i = content_start_index
    
    while i < len(content):
        if content[i:i+4] == '<div':
            open_tags += 1
            i += 4
        elif content[i:i+5] == '</div':
            open_tags -= 1
            i += 5
            if open_tags == 0:
                while i < len(content) and content[i] != '>':
                    i += 1
                end_pos = i + 1
                return content[start_pos:end_pos], start_pos, end_pos
        else:
            i += 1
            
    return None, -1, -1

def main():
    file_path = '/workspace/index.html'
    with open(file_path, 'r') as f:
        content = f.read()

    print("Reading file...")

    # 1. Extract Need Help Card (to be moved)
    help_html, h_start, h_end = extract_block_with_tag(content, "<!-- Need Help Card -->")
    if not help_html:
        print("Failed to extract Need Help Card")
        return

    # 2. Extract Video Section (to be preserved/unwrapped)
    video_html, v_start, v_end = extract_block_with_tag(content, "<!-- Video Section -->")
    if not video_html:
        print("Failed to extract Video Section")
        return

    # 3. Identify the "Step 4" Grid container to remove it entirely
    # We will replace this entire grid block with just the video_html
    grid_marker = "<!-- Step 4: Video & Support -->"
    grid_match = re.search(re.escape(grid_marker), content)
    if not grid_match:
        print("Step 4 Grid marker not found")
        return
    
    # Find the end of this grid div
    # It starts with <div class="grid ...">
    # We can use the logic similar to extract_block, but we just need the start and end indices of the CONTAINER
    
    # Let's use the extract logic for the grid container
    _, grid_start, grid_end = extract_block_with_tag(content, grid_marker)
    if grid_start == -1:
        print("Failed to identify Step 4 Grid container")
        return

    # 4. Identify Insertion Point for Help Card (in Sidebar)
    # Look for "<!-- Right Column: Learning Outcomes (Sticky) -->"
    sidebar_marker = "<!-- Right Column: Learning Outcomes (Sticky) -->"
    sidebar_match = re.search(re.escape(sidebar_marker), content)
    if not sidebar_match:
        print("Sidebar marker not found")
        return
        
    # Inside sidebar, find the first card (Learning Outcomes)
    # It is the first child of the sticky div.
    # The sticky div is: <div class="sticky top-24 space-y-8">
    sticky_div_match = re.search(r'<div class="sticky top-24 space-y-8">', content[sidebar_match.end():])
    if not sticky_div_match:
        print("Sticky container not found")
        return
        
    sticky_start_idx = sidebar_match.end() + sticky_div_match.start()
    
    # Find the closing of the sticky container so we can search inside it
    # Actually, simpler: The Learning Outcomes card is the *first* div inside the sticky container.
    # Let's find that first div and its closing tag.
    
    # Content after sticky div start
    search_area_start = sticky_start_idx + len('<div class="sticky top-24 space-y-8">')
    
    # Find start of Learning Outcomes card
    lo_card_start_match = re.search(r'<div', content[search_area_start:])
    if not lo_card_start_match:
        print("Learning Outcomes card start not found")
        return
        
    lo_card_abs_start = search_area_start + lo_card_start_match.start()
    
    # Find matching closing tag for Learning Outcomes card
    # We can reuse the logic but we need a function that works on index, not marker
    
    def find_closing_tag(full_text, start_index):
        open_tags = 0
        i = start_index
        while i < len(full_text):
            if full_text[i:i+4] == '<div':
                open_tags += 1
                i += 4
            elif full_text[i:i+5] == '</div':
                open_tags -= 1
                i += 5
                if open_tags == 0:
                    while i < len(full_text) and full_text[i] != '>':
                        i += 1
                    return i + 1
            else:
                i += 1
        return -1

    lo_card_end = find_closing_tag(content, lo_card_abs_start)
    if lo_card_end == -1:
        print("Could not find end of Learning Outcomes card")
        return

    # 5. Perform Operations
    # We have two main ops:
    # A. Replace Grid (grid_start to grid_end) with video_html
    # B. Insert help_html after lo_card_end
    
    # Note: B might be AFTER A in the file (Sidebar is typically after Main column in HTML if standard layout, 
    # but let's check indices.
    # Grid is lines 189-229
    # Sidebar is lines 236+
    # So Grid comes FIRST.
    
    ops = [
        ('replace', grid_start, grid_end, video_html),
        ('insert', lo_card_end, '\n' + help_html)
    ]
    
    # Sort descending by start position to avoid offset issues
    ops.sort(key=lambda x: x[1], reverse=True)
    
    new_content = content
    for op in ops:
        if op[0] == 'replace':
            start, end, text = op[1], op[2], op[3]
            new_content = new_content[:start] + text + new_content[end:]
        elif op[0] == 'insert':
            pos, text = op[1], op[2]
            new_content = new_content[:pos] + text + new_content[pos:]
            
    with open(file_path, 'w') as f:
        f.write(new_content)
        
    print("Assistance box moved back to sidebar successfully.")

if __name__ == "__main__":
    main()
