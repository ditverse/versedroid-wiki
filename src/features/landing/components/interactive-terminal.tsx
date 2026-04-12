"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";

/* ── output line types ── */
type Line =
    | { t: "prompt"; text: string }
    | { t: "out";    text: string }
    | { t: "ok";     text: string }
    | { t: "err";    text: string }
    | { t: "dim";    text: string }
    | { t: "blank" }
    | { t: "fastfetch" }
    | { t: "help" };

/* ── fastfetch data ── */
const ASCII_ART = [
    "      _____      ",
    "     /     \\     ",
    "    | () () |    ",
    "    |   ^   |    ",
    "    | \\___/ |    ",
    "     \\_____/     ",
    "     |     |     ",
    "  ___|_____|___  ",
    "                 ",
    "                 ",
    "                 ",
    "                 ",
    "                 ",
];

const INFO_DATA: [string, string][] = [
    ["OS",        "Android 14 (UP1A.231005.007)"],
    ["Host",      "Pixel 6 Pro (raven)"],
    ["Kernel",    "5.10.168-android13-4"],
    ["Uptime",    "3 hours, 42 mins"],
    ["Shell",     "bash 5.2.21"],
    ["CPU",       "Google Tensor G2 (8) @ 2.85GHz"],
    ["GPU",       "Mali-G710 MP7"],
    ["Memory",    "4.2 GiB / 12.0 GiB"],
    ["Storage",   "45.2 GiB / 256.0 GiB"],
    ["Battery",   "78% [Charging]"],
    ["Display",   "1440×3120 @ 120Hz"],
];

/* ── initial session history (shown on load) ── */
const INITIAL_LINES: Line[] = [
    { t: "prompt", text: "adb devices" },
    { t: "out",    text: "List of devices attached" },
    { t: "ok",     text: "  a1b2c3d4e5f6  device" },
    { t: "blank" },
    { t: "prompt", text: "adb reboot bootloader" },
    { t: "dim",    text: "Rebooting to bootloader…" },
    { t: "blank" },
    { t: "prompt", text: "fastboot flashing unlock" },
    { t: "out",    text: "..." },
    { t: "ok",     text: "OKAY [  5.123s]" },
    { t: "ok",     text: "finished. total time: 5.123s" },
    { t: "blank" },
    { t: "prompt", text: "fastboot flash boot boot.img" },
    { t: "dim",    text: "Sending 'boot' (65536 KB)…" },
    { t: "ok",     text: "OKAY [  2.847s]" },
    { t: "dim",    text: "Writing 'boot'…" },
    { t: "ok",     text: "OKAY [  1.234s]" },
    { t: "ok",     text: "finished. total time: 4.081s" },
];

/* ── command processor ── */
function runCommand(raw: string): Line[] | "clear" {
    const cmd  = raw.trim();
    const low  = cmd.toLowerCase();

    if (!cmd) return [];
    if (low === "clear") return "clear";

    if (low === "fastfetch") return [{ t: "fastfetch" }];
    if (low === "help")      return [{ t: "help" }];

    if (low === "adb devices") return [
        { t: "out", text: "List of devices attached" },
        { t: "ok",  text: "  a1b2c3d4e5f6  device" },
        { t: "blank" },
    ];

    if (low === "adb reboot") return [
        { t: "dim", text: "Rebooting…" },
        { t: "ok",  text: "Done." },
    ];

    if (low === "adb reboot bootloader") return [
        { t: "dim", text: "Rebooting to bootloader…" },
        { t: "ok",  text: "Done. Device is now in Fastboot mode." },
    ];

    if (low === "adb reboot recovery") return [
        { t: "dim", text: "Rebooting to recovery…" },
        { t: "ok",  text: "Done." },
    ];

    if (low === "adb shell") return [
        { t: "dim", text: "$ (device shell — simulation)" },
        { t: "dim", text: "  Try: getprop ro.product.model" },
    ];

    if (low === "adb shell getprop ro.product.model") return [
        { t: "out", text: "Pixel 6 Pro" },
    ];

    if (low === "adb shell getprop ro.build.version.release") return [
        { t: "out", text: "14" },
    ];

    if (low === "fastboot devices") return [
        { t: "ok",  text: "a1b2c3d4e5f6  fastboot" },
        { t: "blank" },
    ];

    if (low === "fastboot flashing unlock") return [
        { t: "out", text: "..." },
        { t: "dim", text: "Sending unlock command…" },
        { t: "ok",  text: "OKAY [  3.712s]" },
        { t: "ok",  text: "finished. total time: 3.712s" },
        { t: "blank" },
        { t: "dim", text: "⚠  Bootloader is now UNLOCKED." },
        { t: "dim", text: "   Device data has been wiped." },
    ];

    if (low === "fastboot flashing lock") return [
        { t: "out", text: "..." },
        { t: "ok",  text: "OKAY [  2.100s]" },
        { t: "ok",  text: "finished. total time: 2.100s" },
        { t: "dim", text: "Bootloader is now LOCKED." },
    ];

    if (low === "fastboot reboot") return [
        { t: "dim", text: "Rebooting…" },
        { t: "ok",  text: "OKAY [  0.090s]" },
        { t: "ok",  text: "finished. total time: 0.090s" },
    ];

    if (low.startsWith("fastboot flash ")) {
        const parts     = low.split(" ");
        const partition = parts[2] || "boot";
        return [
            { t: "dim", text: `Sending '${partition}' (65536 KB)…` },
            { t: "ok",  text: "OKAY [  2.847s]" },
            { t: "dim", text: `Writing '${partition}'…` },
            { t: "ok",  text: "OKAY [  1.234s]" },
            { t: "ok",  text: "finished. total time: 4.081s" },
        ];
    }

    if (low === "exit" || low === "quit") return [
        { t: "dim", text: "(Can't quit — this is just a simulation.)" },
    ];

    if (low.startsWith("adb ")) return [
        { t: "err", text: `adb: error: '${cmd.slice(4)}' — unknown command` },
    ];

    if (low.startsWith("fastboot ")) return [
        { t: "err", text: `fastboot: error: unknown command '${cmd.slice(9)}'` },
    ];

    return [
        { t: "err", text: `bash: ${cmd}: command not found` },
        { t: "dim", text: "Type 'help' for available commands." },
    ];
}

/* ── main component ── */
export function InteractiveTerminal() {
    const [lines,   setLines  ] = useState<Line[]>(INITIAL_LINES);
    const [input,   setInput  ] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);

    const outputRef = useRef<HTMLDivElement>(null);
    const inputRef  = useRef<HTMLInputElement>(null);

    /* scroll to bottom whenever new lines are added */
    useEffect(() => {
        const el = outputRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [lines]);

    /* focus input on click anywhere in terminal */
    const handleWrapperClick = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                const result = runCommand(input);
                const promptLine: Line = { t: "prompt", text: input };

                if (result === "clear") {
                    setLines([]);
                } else {
                    setLines(prev => [...prev, promptLine, ...result]);
                }

                if (input.trim()) {
                    setHistory(prev =>
                        [input.trim(), ...prev.filter(h => h !== input.trim())].slice(0, 50)
                    );
                }
                setHistIdx(-1);
                setInput("");
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const idx = Math.min(histIdx + 1, history.length - 1);
                setHistIdx(idx);
                setInput(history[idx] ?? "");
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const idx = Math.max(histIdx - 1, -1);
                setHistIdx(idx);
                setInput(idx === -1 ? "" : (history[idx] ?? ""));
            }
        },
        [input, history, histIdx]
    );

    return (
        <div
            className="rounded-xl overflow-hidden cursor-text select-none"
            style={{ background: "var(--vd-terminal-bg)", border: "1px solid var(--vd-terminal-border)" }}
            onClick={handleWrapperClick}
        >
            {/* Title bar */}
            <div
                className="flex items-center gap-1.5 px-4 py-3"
                style={{
                    background: "var(--vd-terminal-header)",
                    borderBottom: "1px solid var(--vd-terminal-border)",
                }}
            >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--vd-danger)",  opacity: 0.6 }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--vd-warning)", opacity: 0.6 }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--vd-terminal-prompt)", opacity: 0.6 }} />
                <span
                    className="ml-2 text-[11px]"
                    style={{ color: "var(--vd-terminal-dim)", fontFamily: "var(--font-dm-mono)" }}
                >
                    terminal — versedroid
                </span>
            </div>

            {/* Output area (scrollable) */}
            <div
                ref={outputRef}
                className="overflow-y-auto p-4"
                style={{
                    height: "320px",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "12.5px",
                    lineHeight: "1.6",
                }}
                onClick={e => e.stopPropagation()}
            >
                {lines.map((line, i) => (
                    <OutputLine key={i} line={line} />
                ))}

                {/* Interactive input line */}
                <div className="flex items-center">
                    <span style={{ color: "var(--vd-terminal-prompt)", userSelect: "none" }}>
                        {"$ "}
                    </span>
                    <input
                        ref={inputRef}
                        value={input}
                        onChange={e => { setInput(e.target.value); setHistIdx(-1); }}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none ml-0.5 select-text"
                        style={{
                            color: "var(--vd-terminal-text)",
                            caretColor: "var(--vd-terminal-prompt)",
                            fontFamily: "inherit",
                            fontSize: "inherit",
                        }}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        placeholder=""
                    />
                </div>
            </div>
        </div>
    );
}

/* ── line renderer ── */
function OutputLine({ line }: { line: Line }) {
    if (line.t === "blank")     return <div style={{ height: "0.6em" }} />;
    if (line.t === "fastfetch") return <FastfetchBlock />;
    if (line.t === "help")      return <HelpBlock />;

    if (line.t === "prompt") {
        return (
            <div className="flex">
                <span style={{ color: "var(--vd-terminal-prompt)", userSelect: "none" }}>{"$ "}</span>
                <span style={{ color: "var(--vd-terminal-text)" }}>{line.text}</span>
            </div>
        );
    }

    const color =
        line.t === "ok"  ? "var(--vd-terminal-prompt)" :
        line.t === "err" ? "var(--vd-terminal-error)"  :
        line.t === "dim" ? "var(--vd-terminal-dim)"    :
        "var(--vd-terminal-text)";

    return <div style={{ color }}>{line.text}</div>;
}

/* ── fastfetch block ── */
function FastfetchBlock() {
    return (
        <div className="flex gap-5 my-1">
            {/* ASCII art */}
            <div className="shrink-0" aria-hidden>
                {ASCII_ART.map((row, i) => (
                    <div key={i} style={{ color: "var(--vd-terminal-prompt)" }}>{row || "\u00A0"}</div>
                ))}
            </div>

            {/* Info */}
            <div>
                {/* username@host */}
                <div>
                    <span style={{ color: "var(--vd-terminal-prompt)", fontWeight: 600 }}>user</span>
                    <span style={{ color: "var(--vd-terminal-dim)" }}>@</span>
                    <span style={{ color: "var(--vd-terminal-text)", fontWeight: 600 }}>versedroid</span>
                </div>
                <div style={{ color: "var(--vd-terminal-dim)" }}>{"─".repeat(30)}</div>

                {INFO_DATA.map(([key, val]) => (
                    <div key={key}>
                        <span style={{ color: "var(--vd-terminal-prompt)", fontWeight: 500 }}>{key}</span>
                        <span style={{ color: "var(--vd-terminal-dim)" }}>: </span>
                        <span style={{ color: "var(--vd-terminal-text)" }}>{val}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── help block ── */
const HELP_CMDS: [string, string][] = [
    ["fastfetch",                   "Show device information"],
    ["adb devices",                 "List connected ADB devices"],
    ["adb reboot",                  "Reboot device normally"],
    ["adb reboot bootloader",       "Reboot to Fastboot mode"],
    ["adb reboot recovery",         "Reboot to Recovery mode"],
    ["adb shell",                   "Open device shell"],
    ["fastboot devices",            "List Fastboot devices"],
    ["fastboot flashing unlock",    "Unlock bootloader"],
    ["fastboot flashing lock",      "Lock bootloader"],
    ["fastboot flash <part> <img>", "Flash a partition"],
    ["fastboot reboot",             "Reboot from Fastboot"],
    ["clear",                       "Clear terminal output"],
];

function HelpBlock() {
    return (
        <div className="my-1">
            <div className="mb-1" style={{ color: "var(--vd-terminal-dim)" }}>
                Available commands:
            </div>
            {HELP_CMDS.map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-2">
                    <span
                        className="shrink-0"
                        style={{ color: "var(--vd-terminal-prompt)", minWidth: "220px" }}
                    >
                        {cmd}
                    </span>
                    <span style={{ color: "var(--vd-terminal-dim)" }}>{desc}</span>
                </div>
            ))}
        </div>
    );
}
