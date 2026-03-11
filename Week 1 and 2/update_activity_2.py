
import os

def update_activity_2():
    file_path = 'index.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the markers to locate the content to replace
    # We want to replace everything inside the <div class="space-y-4"> of section activity-steps-2
    section_start_marker = '<section id="activity-steps-2"'
    inner_div_start = '<div class="space-y-4">'
    section_end_marker = '</section>'

    # 1. Find Section Start
    start_idx = content.find(section_start_marker)
    if start_idx == -1:
        print("Error: Section activity-steps-2 not found.")
        return

    # 2. Find the inner space-y-4 div AFTER the section start
    div_start_idx = content.find(inner_div_start, start_idx)
    if div_start_idx == -1:
        print("Error: Inner content div not found.")
        return

    # 3. Find the closing of the section to bound our search
    sect_end_idx = content.find(section_end_marker, start_idx)
    
    # 4. Find the closing </div> of the space-y-4 div
    # We can assume it's the last </div> before the section closes
    div_end_idx = content.rfind('</div>', div_start_idx, sect_end_idx)
    
    if div_end_idx == -1:
         print("Error: Could not find closing div for content.")
         return

    # 5. Define New Content
    # We need 3 steps matching the style of the first section
    # Note: data-step attributes should continue incrementing. 
    # Section 1 had steps 1, 2, 3. So we start at 4.
    
    new_html_content = """<div class="space-y-4">
                            <!-- Step 1: Access -->
                            <div class="bg-brand-card border border-white/10 rounded-xl p-1 transition-all hover:border-brand-secondary/50 group step-card" data-step="4">
                                <label class="flex items-start gap-4 p-5 cursor-pointer relative z-10">
                                    <input type="checkbox" class="step-checkbox w-6 h-6 rounded border-slate-600 text-brand-primary focus:ring-brand-primary bg-brand-dark/50 mt-1 transition-all" onchange="updateProgress()">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-white group-hover:text-brand-secondary transition-colors">Access Senseii Games</h3>
                                        <div class="text-blue-200 mt-1 text-sm mb-2">Go to the game platform to start your challenge.</div>
                                        <a href="https://www.senseiigames.com/" target="_blank" class="inline-flex items-center gap-2 text-brand-primary hover:text-white transition-colors text-sm font-medium">
                                            Open Senseii Games <i data-lucide="external-link" class="w-4 h-4"></i>
                                        </a>
                                    </div>
                                    <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2">
                                        <i data-lucide="arrow-right-circle" class="w-6 h-6 text-brand-secondary"></i>
                                    </div>
                                </label>
                            </div>

                            <!-- Step 2: Complete Levels -->
                            <div class="bg-brand-card border border-white/10 rounded-xl p-1 transition-all hover:border-brand-secondary/50 group step-card" data-step="5">
                                <label class="flex items-start gap-4 p-5 cursor-pointer relative z-10">
                                    <input type="checkbox" class="step-checkbox w-6 h-6 rounded border-slate-600 text-brand-primary focus:ring-brand-primary bg-brand-dark/50 mt-1 transition-all" onchange="updateProgress()">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-white group-hover:text-brand-secondary transition-colors">Complete Maze Levels 1–5</h3>
                                        <p class="text-blue-200 mt-1 text-sm">Work through each maze level to build problem-solving skills and resilience.</p>
                                    </div>
                                </label>
                            </div>

                            <!-- Step 3: Track Progress -->
                            <div class="bg-brand-card border border-white/10 rounded-xl p-1 transition-all hover:border-brand-secondary/50 group step-card" data-step="6">
                                <label class="flex items-start gap-4 p-5 cursor-pointer relative z-10">
                                    <input type="checkbox" class="step-checkbox w-6 h-6 rounded border-slate-600 text-brand-primary focus:ring-brand-primary bg-brand-dark/50 mt-1 transition-all" onchange="updateProgress()">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-white group-hover:text-brand-secondary transition-colors">Track Your Progress</h3>
                                        <p class="text-blue-200 mt-1 text-sm">Note your completion of each level as you master the game mechanics.</p>
                                    </div>
                                </label>
                            </div>
                        </div>"""

    # 6. Replace Content
    # We replace from the start of the div (div_start_idx) to the end of the div (div_end_idx + 6 for </div>)
    # Actually, my new_html_content includes the wrapper <div class="space-y-4">...</div>
    # So I will replace the entire old div block.
    
    # Locate exact end of the old div
    old_div_end = div_end_idx + 6 
    
    final_content = content[:div_start_idx] + new_html_content + content[old_div_end:]

    # 7. Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("Successfully updated Activity 2 with 3 detailed steps.")

if __name__ == "__main__":
    update_activity_2()
