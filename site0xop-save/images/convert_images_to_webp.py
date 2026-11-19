#!/usr/bin/env python3
"""Convert JPG, PNG, and GIF images to WebP in the same folder.

Usage:
    python convert_images_to_webp.py INPUT_FOLDER

The script only scans INPUT_FOLDER itself, not subfolders, and always overwrites
existing WebP files with the same base filename.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageSequence, UnidentifiedImageError

# WebP conversion quality, expressed as a percentage from 0 to 100.
CONVERSION_QUALITY = 73

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif"}


def convert_image(source: Path, destination: Path) -> None:
    """Convert one image to WebP and overwrite the destination if it exists."""
    with Image.open(source) as image:
        # Preserve animated GIFs as animated WebP files.
        if image.format == "GIF" and getattr(image, "n_frames", 1) > 1:
            frames = []
            durations = []

            for frame in ImageSequence.Iterator(image):
                frames.append(frame.convert("RGBA"))
                durations.append(frame.info.get("duration", 100))

            frames[0].save(
                destination,
                format="WEBP",
                save_all=True,
                append_images=frames[1:],
                duration=durations,
                loop=image.info.get("loop", 0),
                quality=CONVERSION_QUALITY,
                method=6,
            )
        else:
            # Preserve transparency where available.
            converted = image.convert("RGBA" if "A" in image.getbands() else "RGB")
            converted.save(
                destination,
                format="WEBP",
                quality=CONVERSION_QUALITY,
                method=6,
            )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Convert JPG, PNG, and GIF images to WebP in the same folder."
    )
    parser.add_argument(
        "input_folder",
        type=Path,
        help="Folder containing the source images",
    )
    args = parser.parse_args()

    input_folder = args.input_folder.expanduser().resolve()

    if not input_folder.is_dir():
        parser.error(f"Folder does not exist or is not a folder: {input_folder}")

    # Non-recursive search: only files directly inside input_folder are selected.
    images = sorted(
        path
        for path in input_folder.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )

    if not images:
        print("No JPG, PNG, or GIF images found.")
        return 0

    converted_count = 0
    failed_count = 0

    for source in images:
        destination = source.with_suffix(".webp")

        try:
            # Pillow overwrites an existing destination file automatically.
            convert_image(source, destination)
            print(f"Converted: {source.name} -> {destination.name}")
            converted_count += 1
        except (OSError, UnidentifiedImageError) as error:
            print(f"Failed: {source.name} ({error})", file=sys.stderr)
            failed_count += 1

    print(
        f"\nFinished: {converted_count} converted, "
        f"{failed_count} failed. Quality: {CONVERSION_QUALITY}%"
    )
    return 1 if failed_count else 0


if __name__ == "__main__":
    raise SystemExit(main())
