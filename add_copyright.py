"""
═══════════════════════════════════════════════════════════════════════════
Copyright Header Generator for LinkedIn AI Automator
═══════════════════════════════════════════════════════════════════════════

This script automatically adds professional copyright headers and detailed
comments to all source files in the project. It supports multiple programming
languages and maintains consistent formatting across the codebase.

Author: Ashraf Morningstar
Copyright: © 2022-2026 Ashraf Morningstar. All rights reserved.
License: MIT

Repository: https://github.com/AshrafMorningstar/LinkedIn-AI-Automator
═══════════════════════════════════════════════════════════════════════════
"""

import os
import re
from datetime import datetime
from pathlib import Path

# Copyright text template
COPYRIGHT_TEXT = """
© 2022-2026 Ashraf Morningstar. All rights reserved.

This is a personal recreation of existing project concepts, developed by
Ashraf Morningstar for learning and skill development purposes.

Original project concepts remain the intellectual property of their
respective creators. This implementation is for educational purposes only.

Repository: https://github.com/AshrafMorningstar/LinkedIn-AI-Automator
"""

# File-specific header templates
HEADERS = {
    '.py': {
        'start': '"""',
        'end': '"""',
        'line': '#'
    },
    '.js': {
        'start': '/**',
        'end': ' */',
        'line': ' *'
    },
    '.ts': {
        'start': '/**',
        'end': ' */',
        'line': ' *'
    },
    '.tsx': {
        'start': '/**',
        'end': ' */',
        'line': ' *'
    },
    '.jsx': {
        'start': '/**',
        'end': ' */',
        'line': ' *'
    },
    '.css': {
        'start': '/**',
        'end': ' */',
        'line': ' *'
    },
    '.html': {
        'start': '<!--',
        'end': '-->',
        'line': ''
    }
}

def generate_header(file_path, file_type):
    """
    Generate a professional copyright header for a given file.
    
    Args:
        file_path (str): Path to the file
        file_type (str): File extension (e.g., '.py', '.ts')
    
    Returns:
        str: Formatted copyright header
    """
    header_style = HEADERS.get(file_type, HEADERS['.py'])
    
    file_name = os.path.basename(file_path)
    
    lines = [
        header_style['start'],
        f"{header_style['line']} ═══════════════════════════════════════════════════════════════════════════",
        f"{header_style['line']} LinkedIn AI Automator - {file_name}",
        f"{header_style['line']} ═══════════════════════════════════════════════════════════════════════════",
        f"{header_style['line']}",
        f"{header_style['line']} @fileoverview Professional copyright header and documentation",
        f"{header_style['line']}",
        f"{header_style['line']} @author Ashraf Morningstar",
        f"{header_style['line']} @copyright © 2022-2026 Ashraf Morningstar. All rights reserved.",
        f"{header_style['line']} @license MIT",
        f"{header_style['line']}",
        f"{header_style['line']} @description",
        f"{header_style['line']} This is a personal recreation developed for learning and skill development.",
        f"{header_style['line']} Original project concepts remain the intellectual property of their",
        f"{header_style['line']} respective creators.",
        f"{header_style['line']}",
        f"{header_style['line']} Repository: https://github.com/AshrafMorningstar/LinkedIn-AI-Automator",
        f"{header_style['line']} ═══════════════════════════════════════════════════════════════════════════",
        header_style['end'],
        ""
    ]
    
    return '\n'.join(lines)

def add_copyright_header(file_path):
    """
    Add or update copyright header in a source file.
    
    Args:
        file_path (str): Path to the source file
    
    Returns:
        bool: True if header was added/updated, False otherwise
    """
    file_ext = os.path.splitext(file_path)[1]
    
    if file_ext not in HEADERS:
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if copyright already exists
        if '© 2022-2026 Ashraf Morningstar' in content:
            print(f"✓ Copyright already present: {file_path}")
            return False
        
        # Generate and prepend header
        header = generate_header(file_path, file_ext)
        new_content = header + '\n' + content
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ Added copyright header: {file_path}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def process_directory(directory):
    """
    Recursively process all source files in a directory.
    
    Args:
        directory (str): Root directory to process
    
    Returns:
        dict: Statistics about processed files
    """
    stats = {
        'processed': 0,
        'skipped': 0,
        'errors': 0
    }
    
    for root, dirs, files in os.walk(directory):
        # Skip node_modules and other build directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', 'dist', '.git', 'legacy']]
        
        for file in files:
            file_path = os.path.join(root, file)
            file_ext = os.path.splitext(file)[1]
            
            if file_ext in HEADERS:
                if add_copyright_header(file_path):
                    stats['processed'] += 1
                else:
                    stats['skipped'] += 1
    
    return stats

if __name__ == '__main__':
    print("═══════════════════════════════════════════════════════════════════════════")
    print("Copyright Header Generator - LinkedIn AI Automator")
    print("═══════════════════════════════════════════════════════════════════════════")
    print()
    
    # Get project root directory
    project_root = os.path.dirname(os.path.abspath(__file__))
    
    print(f"Processing directory: {project_root}")
    print()
    
    stats = process_directory(project_root)
    
    print()
    print("═══════════════════════════════════════════════════════════════════════════")
    print(f"✓ Processed: {stats['processed']} files")
    print(f"○ Skipped: {stats['skipped']} files")
    print(f"✗ Errors: {stats['errors']} files")
    print("═══════════════════════════════════════════════════════════════════════════")
