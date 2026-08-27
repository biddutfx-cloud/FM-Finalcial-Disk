import sys
import struct
from pathlib import Path

def png_to_ico(png_path, ico_path):
    with open(png_path, 'rb') as f:
        png_data = f.read()
    
    # Simple ICO format header with 1 embedded PNG image
    # Header: Reserved(2 bytes = 0), Type(2 bytes = 1 for ICO), Count(2 bytes = 1)
    header = struct.pack('<HHH', 0, 1, 1)
    
    # Directory entry (16 bytes):
    # Width(1), Height(1), ColorCount(1), Reserved(1), Planes(2), BitCount(2), BytesInRes(4), ImageOffset(4)
    # Note: 0 width/height in ICO directory means 256px
    entry = struct.pack('<BBBBHHII', 0, 0, 0, 0, 1, 32, len(png_data), 6 + 16)
    
    with open(ico_path, 'wb') as f:
        f.write(header)
        f.write(entry)
        f.write(png_data)

if __name__ == '__main__':
    png = Path(sys.argv[1])
    ico = Path(sys.argv[2])
    png_to_ico(png, ico)
    print("Converted successfully")
