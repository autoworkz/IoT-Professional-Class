import os

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Target the header div of Activity 2
# We look for the section start and the header div
section_start = '<section id="activity-steps-2"'
header_content_start = '<div class="flex items-center justify-between mb-8">'
h2_content = """
                            <h2 class="text-2xl font-bold text-brand-dark flex items-start gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm mt-1">2</span>
                                <div>
                                    In-Class Activity<br>
                                    Steps
                                </div>
                            </h2>
"""

# We want to replace the header div content to include the progress bar
# The original header block is:
# <div class="flex items-center justify-between mb-8">
#     <h2 ...> ... </h2>
# </div>

# The new header block should be:
new_header_block = """                        <div class="flex items-center justify-between mb-8">
                            <h2 class="text-2xl font-bold text-brand-dark flex items-start gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm mt-1">2</span>
                                <div>
                                    In-Class Activity<br>
                                    Steps
                                </div>
                            </h2>
                            <div class="flex flex-col items-end gap-2">
                                <span class="text-sm text-brand-dark" id="progress-text-2">0/3 Completed</span>
                                <div class="w-32 h-1.5 bg-brand-dark/10 rounded-full overflow-hidden">
                                    <div id="progress-bar-2" class="h-full bg-gradient-to-r from-brand-secondary to-brand-primary w-0 transition-all duration-500"></div>
                                </div>
                            </div>
                        </div>"""

# Let's try to locate the specific block in the file
# Since indentation might vary slightly, let's look for the unique signature of the section 2 header
# We can find the start of section 2, then the first "flex items-center justify-between mb-8" after it
start_idx = content.find(section_start)
if start_idx != -1:
    header_idx = content.find(header_content_start, start_idx)
    if header_idx != -1:
        # Find the closing div of this header
        # It should be after the h2 closes
        h2_end_idx = content.find('</h2>', header_idx)
        div_end_idx = content.find('</div>', h2_end_idx)
        
        # We need to include the closing </div> in the replacement range
        # The range to replace is from header_idx to div_end_idx + 6 (length of </div>)
        
        # But wait, identifying the EXACT range to replace is tricky with string find if there are nested divs
        # In this case, the header div contains only the h2 (in the original).
        # Let's verify: 
        # <div class...>
        #    <h2...> ... </h2>
        # </div>
        # Yes, h2 is the only child.
        
        original_block = content[header_idx:div_end_idx+6]
        
        # Let's just replace the H2 closing tag with H2 closing + new progress elements + closing div
        # But we need to keep the outer div opening.
        
        # Simpler strategy: Construct the replacement string manually
        # and replace the exact string if we can match it, or use the indices.
        
        # Using indices is safer.
        new_content = content[:header_idx] + new_header_block + content[div_end_idx+6:]
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully updated Activity 2 header with progress bar.")
    else:
        print("Error: Could not find header in Activity 2.")
else:
    print("Error: Could not find Activity 2 section.")
