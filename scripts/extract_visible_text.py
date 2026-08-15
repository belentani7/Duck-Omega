from pathlib import Path
import re

PROJECT = Path(__file__).resolve().parents[1]
ROOT = PROJECT / "client/src/pages"
COMPONENTS = [PROJECT / "client/src/components/AIChatBox.tsx", PROJECT / "client/src/components/ErrorBoundary.tsx", PROJECT / "client/src/components/ManusDialog.tsx"]
text_pattern = re.compile(r">\s*([^<{][^<>{]*[A-Za-zÀ-ÿ][^<>{]*)\s*<")
attr_pattern = re.compile(r"(?:placeholder|aria-label|title|alt|emptyStateMessage)=(?:\"([^\"]*[A-Za-zÀ-ÿ][^\"]*)\"|'([^']*[A-Za-zÀ-ÿ][^']*)')")
excluded = ("=>", "const ", "return ", "?.", "selected", "value ===", "new Date", "className", "http")
ignored_exact = {
    "PayPal", "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Remix",
    "@nextjs", "@radix-ui/primitives", "@radix-ui/colors", "@stitches/react",
    "@vercel", "WAI-ARIA", "Shadcn/ui", "Markdown", "LLM", "tRPC", "OTP",
}

def clean(value: str) -> str | None:
    value = re.sub(r"\s+", " ", value).strip()
    if not value or value in ignored_exact or any(token in value for token in excluded):
        return None
    if value.startswith(("{", "`", "//", "/*")):
        return None
    return value

paths = sorted(ROOT.rglob("*.tsx")) + COMPONENTS
for path in paths:
    if not path.exists():
        continue
    text = path.read_text(encoding="utf-8")
    found: list[str] = []
    for match in text_pattern.finditer(text):
        value = clean(match.group(1))
        if value and value not in found:
            found.append(value)
    for match in attr_pattern.finditer(text):
        value = clean(next((group for group in match.groups() if group), ""))
        if value and value not in found:
            found.append(value)
    if found:
        print(f"## {path.relative_to(PROJECT / 'client/src')}")
        for value in found:
            print(f"- {value}")
