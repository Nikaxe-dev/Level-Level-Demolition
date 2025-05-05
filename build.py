# This script is completly made by ai
# Yes im that lazy
# Yes im too bothered to learn python properly to make it myself
# And yes i will eat my own words and do it myself if it stops working.

import os
import shutil
import time
from datetime import datetime
import hashlib

build_interval = 2.5
comment = "// Scripts created by Nikaxe and compiled from typescript to javascript.\n\n"

def clearbuild(build_dir):
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)
    os.makedirs(build_dir)

def copy_non_ts_files(src_dir, build_dir):
    if not os.path.exists(build_dir):
        os.makedirs(build_dir)

    for root, _, files in os.walk(src_dir):
        relative_path = os.path.relpath(root, src_dir)
        target_dir = os.path.join(build_dir, relative_path)

        if not os.path.exists(target_dir):
            os.makedirs(target_dir)

        for file in files:
            if not file.endswith('.ts'):
                src_file = os.path.join(root, file)
                dest_file = os.path.join(target_dir, file)
                shutil.copy2(src_file, dest_file)

def compiletypescript():
    os.system("tsc")

def addcommenttojavascript(build_dir):
    for root, _, files in os.walk(build_dir):
        for file in files:
            if file.endswith('.js'):
                js_file_path = os.path.join(root, file)
                with open(js_file_path, 'r+', encoding='utf-8') as f:
                    content = f.read()
                    f.seek(0, 0)
                    f.write(comment + content)

def transfer_to_build(pre_build_dir, build_dir):
    if os.path.exists(build_dir):
        shutil.rmtree(build_dir)
    shutil.copytree(pre_build_dir, build_dir)

src_directory = './src'
pre_build_directory = './pre-build'
build_directory = './build'

def build():
    os.system("cls")
    nowtime = datetime.now()
    print(nowtime.strftime("%d/%m/%Y, %H:%M:%S") + " > Building Files")

    clearbuild(pre_build_directory)
    copy_non_ts_files(src_directory, pre_build_directory)
    compiletypescript()
    addcommenttojavascript(pre_build_directory)
    transfer_to_build(pre_build_directory, build_directory)

    print("Built files in " + str((nowtime.microsecond - datetime.now().microsecond) / 1000000) + " seconds")

def get_file_hash(file_path):
    """Calculate a hash of the file content, ignoring whitespace changes."""
    hasher = hashlib.sha256()
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            # Strip whitespace and newlines before hashing
            hasher.update(line.strip().encode('utf-8'))
    return hasher.hexdigest()

def get_all_files_with_hash(directory):
    """Get a dictionary of file paths and their content hashes."""
    file_hashes = {}
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            if os.path.isfile(file_path):
                file_hashes[file_path] = get_file_hash(file_path)
    return file_hashes

def watch_and_copy(src_dir, build_dir):
    previous_files = get_all_files_with_hash(src_dir)

    while True:
        time.sleep(build_interval)  # Check for changes every second
        current_files = get_all_files_with_hash(src_dir)

        if current_files != previous_files:
            build()
            previous_files = current_files

build()

watch_and_copy(src_directory, build_directory)