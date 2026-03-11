
import os

def add_section():
    file_path = '/workspace/index.html'
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # HTML to insert
    new_section = """
                    <!-- Activity Steps Section 2 -->
                    <section id="activity-steps-2" class="animate-on-scroll mt-12">
                        <div class="flex items-center justify-between mb-8">
                            <h2 class="text-2xl font-bold text-brand-dark flex items-start gap-3">
                                <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-primary text-white text-sm mt-1">2</span>
                                <div>
                                    In-Class Activity<br>
                                    Steps
                                </div>
                            </h2>
                        </div>

                        <div class="space-y-4">
                            <!-- Step 1 of Section 2 -->
                            <div class="bg-brand-card border border-white/10 rounded-xl p-1 transition-all hover:border-brand-secondary/50 group step-card" data-step="4">
                                <label class="flex items-start gap-4 p-5 cursor-pointer relative z-10">
                                    <input type="checkbox" class="step-checkbox w-6 h-6 rounded border-slate-600 text-brand-primary focus:ring-brand-primary bg-brand-dark/50 mt-1 transition-all" onchange="updateProgress()">
                                    <div class="flex-1">
                                        <h3 class="text-lg font-semibold text-white group-hover:text-brand-secondary transition-colors">Complete Senseii Games Maze Levels 1–5</h3>
                                        <div class="text-blue-200 mt-1 text-sm mb-2">Master the maze challenges to demonstrate problem-solving skills.</div>
                                        <a href="https://www.senseiigames.com/" target="_blank" class="inline-flex items-center gap-2 text-brand-primary hover:text-white transition-colors text-sm font-medium">
                                            Open Senseii Games <i data-lucide="external-link" class="w-4 h-4"></i>
                                        </a>
                                    </div>
                                    <div class="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2">
                                        <i data-lucide="arrow-right-circle" class="w-6 h-6 text-brand-secondary"></i>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </section>
"""

    # Target: The closing tag of the first section
    # The first section starts at <section id="activity-steps" ...>
    # We look for the closing </section> of that specific block.
    # Given the file structure, it's the first </section> inside the left column wrapper.
    # To be safe, we can look for the string fragment identifying the end of the first list.
    
    target_str = '                        </div>\n                    </section>'
    
    if target_str in content:
        new_content = content.replace(target_str, target_str + '\n' + new_section)
        
        with open(file_path, 'w') as f:
            f.write(new_content)
        print("Successfully added the new activity section.")
    else:
        print("Error: Could not find the target insertion point.")

if __name__ == "__main__":
    add_section()
