#!/usr/bin/env python3
"""
compare.py — Compare two crawl results. Keep or revert decision helper.

Usage:
    python compare.py --baseline results/baseline.json --current results/latest.json
"""

import argparse
import json


def load(path):
    with open(path) as f:
        return json.load(f)


def compare(baseline_path, current_path):
    b = load(baseline_path)
    c = load(current_path)

    b_score = b["ILS"]
    c_score = c["ILS"]
    delta   = round(c_score - b_score, 2)
    verdict = "✅ KEEP" if delta >= 2 else ("⚠️  MARGINAL (review manually)" if delta > 0 else "❌ REVERT")

    print()
    print("=" * 55)
    print(f"  COMPARISON REPORT")
    print("=" * 55)
    print(f"  Baseline ILS:  {b_score:6.2f}   ({b['timestamp'][:10]})")
    print(f"  Current ILS:   {c_score:6.2f}   ({c['timestamp'][:10]})")
    print(f"  Delta:         {delta:+.2f}")
    print(f"  Verdict:       {verdict}")
    print("-" * 55)

    components = ["crawl_depth", "orphan_rate", "pagerank_distribution", "hub_connectivity"]
    maxes      = {"crawl_depth": 40, "orphan_rate": 30, "pagerank_distribution": 20, "hub_connectivity": 10}

    print(f"  {'Component':<28} {'Before':>7} {'After':>7} {'Delta':>7}")
    print(f"  {'-'*28} {'-'*7} {'-'*7} {'-'*7}")

    for comp in components:
        bs = b["breakdown"][comp]["score"]
        cs = c["breakdown"][comp]["score"]
        d  = round(cs - bs, 2)
        arrow = "↑" if d > 0 else ("↓" if d < 0 else "→")
        print(f"  {comp:<28} {bs:>7.1f} {cs:>7.1f} {arrow}{abs(d):>5.1f}")

    print()

    # Highlight biggest movers
    deltas = {comp: round(c["breakdown"][comp]["score"] - b["breakdown"][comp]["score"], 2)
              for comp in components}

    biggest_win  = max(deltas, key=lambda k: deltas[k])
    biggest_loss = min(deltas, key=lambda k: deltas[k])

    if deltas[biggest_win] > 0:
        print(f"  Biggest win:  {biggest_win} (+{deltas[biggest_win]})")
    if deltas[biggest_loss] < 0:
        print(f"  Biggest loss: {biggest_loss} ({deltas[biggest_loss]})")

    # Page count change
    p_delta = c["page_count"] - b["page_count"]
    if p_delta != 0:
        print(f"\n  Pages crawled: {b['page_count']} → {c['page_count']} ({p_delta:+d})")

    print()
    print(f"  Decision: {verdict}")
    print()

    return delta >= 2


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compare two ILS crawl results")
    parser.add_argument("--baseline", required=True, help="Path to baseline JSON")
    parser.add_argument("--current",  required=True, help="Path to current JSON")
    args = parser.parse_args()

    kept = compare(args.baseline, args.current)
    exit(0 if kept else 1)
