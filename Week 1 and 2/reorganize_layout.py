import re

def extract_block_with_tag(content, marker_comment):
    """
    Finds a block starting with a specific comment, identifies the next opening tag,
    and extracts everything up to its matching closing tag.
    Returns (extracted_text, start_index, end_index).
    """
    # Find the marker
    marker_match = re.search(re.escape(marker_comment), content)
    if not marker_match:
        print(f"Marker '{marker_comment}' not found.")
        return None, -1, -1
    
    start_pos = marker_match.start()
    
    # Find the first opening tag after the marker
    tag_start_search = re.search(r'<div', content[start_pos:])
    if not tag_start_search:
        print(f"No div found after marker '{marker_comment}'.")
        return None, -1, -1
    
    content_start_index = start_pos + tag_start_search.start()
    
    # Simple stack to find matching closing div
    open_tags = 0
    in_tag = False
    i = content_start_index
    
    # Verify we are at '<'
    if content[i] != '<':
        print("Error in tag finding logic.")
        return None, -1, -1

    while i < len(content):
        if content[i:i+4] == '<div':
            open_tags += 1
            i += 4
        elif content[i:i+5] == '</div':
            open_tags -= 1
            i += 5
            if open_tags == 0:
                # Found the closing tag for the main block
                # Find the end of this tag
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

    # 1. Extract Video Section
    video_html, v_start, v_end = extract_block_with_tag(content, "<!-- Video Section -->")
    if not video_html:
        print("Failed to extract Video Section")
        return

    # Remove Video Section from content (replace with empty string for now, careful with indices)
    # Better strategy: Identify all ranges to remove first, then reconstruct.
    
    # 2. Extract Need Help Card
    help_html, h_start, h_end = extract_block_with_tag(content, "<!-- Need Help Card -->")
    if not help_html:
        print("Failed to extract Need Help Card")
        return

    # 3. Prepare New Content
    
    # Modify Video HTML
    # Remove 'my-20' -> 'mt-8'
    # Remove 'max-w-4xl'
    modified_video_html = video_html.replace('my-20', 'mt-8')
    modified_video_html = modified_video_html.replace('max-w-4xl', '')
    
    # Construct New Grid
    new_grid_html = f"""
                    <!-- Step 4: Video & Support -->
                    <div class="grid md:grid-cols-2 gap-6 mt-8">
                        <!-- Left Column: Video -->
                        <div>
                            {modified_video_html}
                        </div>
                        
                        <!-- Right Column: Assistance -->
                        <div>
                            {help_html}
                        </div>
                    </div>
    """
    
    # 4. Perform Insertions and Deletions
    # We need to do this carefully to avoid index shifting problems.
    # We will slice the string.
    
    # Find Insertion Point: After </section> of activity-steps
    # Locate <section id="activity-steps"
    section_match = re.search(r'<section id="activity-steps"', content)
    if not section_match:
        print("Activity steps section not found")
        return
        
    # Find the closing </section> for this specific section
    # Since we know the structure, we can just look for the first </section> after the start
    # But to be safe, let's use the same logic or just search </section> since it's likely the first one in that block
    section_end_match = re.search(r'</section>', content[section_match.start():])
    if not section_end_match:
        print("Activity steps closing tag not found")
        return
        
    insertion_index = section_match.start() + section_end_match.end()

    # Sort operations by index (descending) to modify string without affecting earlier indices
    ops = [
        ('delete', v_start, v_end),
        ('delete', h_start, h_end),
        ('insert', insertion_index, new_grid_html)
    ]
    
    # Sort by start position descending
    ops.sort(key=lambda x: x[1], reverse=True)
    
    new_content = content
    for op in ops:
        if op[0] == 'delete':
            start, end = op[1], op[2]
            new_content = new_content[:start] + new_content[end:]
        elif op[0] == 'insert':
            pos = op[1]
            new_content = new_content[:pos] + op[2] + new_content[pos:]
            
    # 5. Write Result
    with open(file_path, 'w') as f:
        f.write(new_content)
    
    print("Layout reorganized successfully.")

if __name__ == "__main__":
    main()
