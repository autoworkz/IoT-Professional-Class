
import re

def modify_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Progress Text
    content = content.replace('0/4 Completed', '0/3 Completed')
    content = content.replace('Finish all 4 steps', 'Finish all 3 steps')

    # 2. Remove Step 4
    # Pattern: <!-- Step 4 --> followed by the div block
    # We'll use regex to find the block. 
    # Since it's nested structure, regex is tricky, but the indentation structure is consistent.
    # We can match from "<!-- Step 4 -->" to the specific closing div.
    # Looking at the file, the block starts at indentation 28 spaces?
    # Let's try to find the start and end by string matching lines.
    
    lines = content.split('\n')
    new_lines = []
    skip = False
    
    step4_start = '<!-- Step 4 -->'
    step4_end_marker = 'data-step="4">' # identifying the line with the opening div
    
    # Logic for Step 4 removal:
    # Find start comment.
    # Skip until we find the closing div for that card.
    # The card is indented. The closing div should be at the same indentation level.
    # Let's simple string replace the known block since we have the exact content from Read.
    
    step4_block = """                            <!-- Step 4 -->
                            <div class="bg-brand-card border border-white/10 rounded-xl p-1 transition-all hover:border-brand-secondary/50 group step-card" data-step="4">
                                <label class="flex items-start gap-4 p-5 cursor-pointer">
                                    <input type="checkbox" class="step-checkbox w-6 h-6 rounded border-slate-600 text-brand-primary focus:ring-brand-primary bg-brand-dark/50 mt-1" onchange="updateProgress()">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-white group-hover:text-brand-secondary transition-colors">Participate in Discussion</h3>
                                        <p class="text-blue-200 mt-1 text-sm">Join the facilitated discussion on Leadership, Operations, and AI strategy.</p>
                                    </div>
                                </label>
                            </div>"""
    
    if step4_block in content:
        print("Found Step 4 block. Removing...")
        content = content.replace(step4_block, '')
    else:
        # Try finding with flexible whitespace if exact match fails
        print("Step 4 block exact match failed. Attempting fuzzy removal...")
        # Fallback to line-based logic
        pass

    # 3. Remove Discussion Topics Section
    # Starts with <!-- Discussion Topics -->
    # Ends with </section>
    
    discussion_start = '<!-- Discussion Topics -->'
    discussion_end = '</section>'
    
    if discussion_start in content:
        start_idx = content.find(discussion_start)
        # Find the next </section> after start_idx
        end_idx = content.find(discussion_end, start_idx)
        if end_idx != -1:
            end_idx += len(discussion_end)
            print("Found Discussion Topics section. Removing...")
            # We also want to remove the indentation before the start comment if possible, to be clean
            # But replace is easier.
            section_to_remove = content[start_idx:end_idx]
            # Include the preceding whitespace (indentation)
            # Find last newline before start_idx
            last_newline = content.rfind('\n', 0, start_idx)
            if last_newline != -1:
                section_to_remove = content[last_newline+1:end_idx]
            
            content = content.replace(section_to_remove, '')
        else:
            print("Could not find end of Discussion Topics section")
    else:
        print("Could not find start of Discussion Topics section")

    # 4. Update Contact Info
    contact_target = 'Contact your instructor or the support team if you have trouble accessing SenseiiWyze.</p>'
    contact_replacement = """Contact your instructor or the support team if you have trouble accessing SenseiiWyze.</p>
                        <div class="mt-4 mb-4 p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                            <p class="text-white font-medium text-sm">Miranda Boyd</p>
                            <a href="mailto:miranda@autoworkz.org" class="text-brand-primary text-sm hover:underline flex items-center gap-2 mt-1">
                                <i data-lucide="mail" class="w-3 h-3"></i>
                                miranda@autoworkz.org
                            </a>
                        </div>"""
    
    if contact_target in content:
        print("Found Contact section. Updating...")
        content = content.replace(contact_target, contact_replacement)
    else:
        print("Could not find Contact section target string")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updates complete.")

if __name__ == "__main__":
    modify_html()
