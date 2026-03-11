def apply_white_theme():
    input_file = 'index.html'
    output_lines = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        # 1. Change body background to white
        if '<body' in line and 'bg-brand-dark' in line:
            line = line.replace('bg-brand-dark', 'bg-white')
        
        # 2. Update Tailwind config for brand.card to be solid dark blue
        if "card: 'rgba(34, 11, 177, 0.3)'" in line:
            line = line.replace("card: 'rgba(34, 11, 177, 0.3)'", "card: '#0f0568'")
            
        # 3. Update Activity Steps heading color
        if 'Activity Steps' in line and '<h2' in line and 'text-white' in line:
            line = line.replace('text-white', 'text-brand-dark')
            
        # 4. Update Progress text color
        if 'id="progress-text"' in line and 'text-blue-200' in line:
            line = line.replace('text-blue-200', 'text-brand-dark')
            
        # 5. Update Assistance card background to be solid
        if 'Need Help Card' in line:
            # The next div has bg-brand-dark/50, we handle it in the next iterations or generally
            pass
        if 'bg-brand-dark/50' in line and 'rounded-2xl' in line and 'Need Assistance' in line: 
             # Use a broader check or context if needed, but simple line check might miss if on next line
             pass
        
        # Specific replacement for the Assistance card div which is known to be:
        # <div class="bg-brand-dark/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        if 'class="bg-brand-dark/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"' in line:
            line = line.replace('bg-brand-dark/50', 'bg-brand-card')

        output_lines.append(line)
            
    with open(input_file, 'w', encoding='utf-8') as f:
        f.writelines(output_lines)
    
    print("Successfully applied white theme adjustments.")

if __name__ == '__main__':
    apply_white_theme()
