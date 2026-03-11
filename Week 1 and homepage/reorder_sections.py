
import os

def reorder_sections():
    file_path = 'index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Markers
    act2_start_marker = '<!-- Activity Steps Section 2 -->'
    act2_end_marker = '</section>'
    next_col_marker = '<!-- Right Column: Learning Outcomes (Sticky) -->'

    # 1. Identify and Extract Activity 2
    print("Locating Activity 2...")
    start_idx = content.find(act2_start_marker)
    if start_idx == -1:
        print("Error: Activity 2 start marker not found.")
        return

    # Find the closing </section> tag for this specific section
    end_tag_idx = content.find(act2_end_marker, start_idx)
    if end_tag_idx == -1:
        print("Error: Activity 2 end marker not found.")
        return
    
    end_idx = end_tag_idx + len(act2_end_marker)
    
    # Extract the block
    activity2_block = content[start_idx:end_idx]
    print(f"Extracted Activity 2 block ({len(activity2_block)} chars).")

    # 2. Remove Activity 2 from the content
    # We strip extra whitespace around the removal if needed, but simple slicing is safer to avoid deleting too much.
    # We will leave the surrounding newlines as is, they will just merge.
    content_minus_act2 = content[:start_idx] + content[end_idx:]
    print("Removed Activity 2 from original position.")

    # 3. Find Insertion Point
    # We want to insert BEFORE the closing </div> of the "lg:col-span-2" container.
    # This container closes just before the "Right Column" comment.
    
    col_idx = content_minus_act2.find(next_col_marker)
    if col_idx == -1:
        print("Error: Right column marker not found.")
        return

    # Find the last </div> before the column marker
    insertion_idx = content_minus_act2.rfind('</div>', 0, col_idx)
    if insertion_idx == -1:
        print("Error: Target closing div not found.")
        return

    print(f"Found insertion point at index {insertion_idx}.")

    # 4. Insert Activity 2
    # Ensure proper spacing
    final_content = (
        content_minus_act2[:insertion_idx] + 
        '\n\n' + 
        activity2_block + 
        '\n\n' + 
        content_minus_act2[insertion_idx:]
    )

    # 5. Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("Successfully reordered sections in index.html.")

if __name__ == "__main__":
    reorder_sections()
