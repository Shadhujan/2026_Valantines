import React, { useState, useEffect, useRef } from 'react';
import {
    Heart,
    FileText,
    Image as ImageIcon,
    Music,
    X,
    Minus,
    Square,
    Disc,
    Play,
    SkipForward,
    SkipBack,
    Trash2,
    Cpu,
    Globe,
    User,
    Power,
    AlertTriangle,
    Download
} from 'lucide-react';

/* --- LOVE OS v1.0 --- 
  A retro Windows 95-style operating system for Valentine's Day.
*/

// --- Utility Components ---

const Button95 = ({ children, onClick, className = "", active = false }) => (
    <button
        onClick={onClick}
        className={`
      px-2 py-1 flex items-center justify-center
      border-2 outline-none active:border-t-black active:border-l-black active:border-b-white active:border-r-white
      ${active
                ? 'border-t-black border-l-black border-b-white border-r-white bg-gray-300 pattern-dots'
                : 'border-t-white border-l-white border-b-black border-r-black bg-gray-300'}
      ${className}
    `}
    >
        {children}
    </button>
);

const WindowFrame = ({ title, onClose, onMinimize, children, isActive, onFocus, position, onMove, id }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        onFocus();
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                onMove(id, {
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, id, onMove]);

    return (
        <div
            onMouseDown={onFocus}
            style={{
                left: position.x,
                top: position.y,
                zIndex: isActive ? 50 : 10
            }}
            className={`absolute w-80 md:w-96 bg-gray-300 border-2 border-t-white border-l-white border-b-black border-r-black shadow-xl flex flex-col font-sans`}
        >
            {/* Title Bar */}
            <div
                onMouseDown={handleMouseDown}
                className={`
          flex justify-between items-center px-1 py-0.5 cursor-move select-none
          ${isActive ? 'bg-[#000080] text-white' : 'bg-gray-400 text-gray-200'}
        `}
            >
                <div className="flex items-center gap-2 font-bold text-sm">
                    {title}
                </div>
                <div className="flex gap-1">
                    <Button95 onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-5 h-5 !p-0 text-xs text-black leading-none">_</Button95>
                    <Button95 onClick={(e) => { e.stopPropagation(); /* Maximize logic usually skipped in simple OS */ }} className="w-5 h-5 !p-0 text-xs text-black leading-none">□</Button95>
                    <Button95 onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-5 h-5 !p-0 text-xs text-black leading-none">×</Button95>
                </div>
            </div>

            {/* Window Content */}
            <div className="p-1 flex-1 overflow-auto max-h-[60vh]">
                {children}
            </div>
        </div>
    );
};

// --- Applications ---

const LoveLetterApp = () => (
    <div className="bg-white border-2 border-gray-500 inset-shadow h-64 p-4 font-mono text-sm overflow-y-auto select-text">
        <p>My Dearest,</p>
        <br />
        <p>If you are reading this, it means you've successfully logged into my heart. I wanted to build something as unique as you are for Valentine's Day.</p>
        <br />
        <p>Just like this operating system runs on code, my life runs better with you in it. You are my essential process, my favorite library, and my constant variable.</p>
        <br />
        <p>I love you more than I hate bugs in production.</p>
        <br />
        <p>Forever yours,</p>
        <p>Dev Boyfriend (Bubu)</p>
    </div>
);

const PhotoGalleryApp = () => {
    // REPLACE THESE URLS WITH REAL PHOTOS OF YOU TWO
    const photos = [
        { url: "/photos/sample.jpg", caption: "Our First Date" },
        { url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&q=80", caption: "That Trip We Took" },
        { url: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?w=400&q=80", caption: "Goofy Times" },
        { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80", caption: "Valentine's '25" },
    ];

    return (
        <div className="bg-white p-2 border-2 border-gray-500 h-64 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
                {photos.map((photo, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="border-2 border-gray-200 p-1 bg-gray-100 hover:bg-blue-100 cursor-pointer">
                            <img src={photo.url} alt={photo.caption} className="w-full h-24 object-cover" />
                        </div>
                        <span className="text-xs mt-1 text-center font-sans">{photo.caption}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper for formatting time
const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const MusicPlayerApp = () => {
    // Sample songs
    const songs = [
        {
            id: 1,
            title: "1. Song 1 - Sample.mp3",
            artist: "SoundHelix",
            url: "/songs/sample1.mp3",
            duration: "03:12" // Approximate
        },
        {
            id: 2,
            title: "2. Song 2 - Sample.mp3",
            artist: "SoundHelix",
            url: "/songs/sample2.mp3",
            duration: "04:05" // Approximate
        }
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Lazy initialization of Audio to avoid creating it on every render
    const audioRef = useRef(null);
    if (audioRef.current === null) {
        audioRef.current = new Audio(songs[0].url);
    }

    useEffect(() => {
        // Update audio source when song changes
        if (audioRef.current) {
            // Only update if src is different to avoid reloading on initial render if logic overlaps
            const newUrl = songs[currentSongIndex].url;
            if (!audioRef.current.src.endsWith(newUrl)) {
                audioRef.current.src = newUrl;
                audioRef.current.load();
                if (playing) {
                    audioRef.current.play().catch(e => console.error("Playback failed:", e));
                }
            }
        }
    }, [currentSongIndex]);

    useEffect(() => {
        // Handle play/pause
        if (audioRef.current) {
            if (playing) {
                audioRef.current.play().catch(e => {
                    console.error("Playback failed:", e);
                    setPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [playing]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Progress interval
        const interval = setInterval(() => {
            if (playing) {
                const duration = audio.duration || 100; // Avoid NaN
                setProgress((audio.currentTime / duration) * 100);
            }
        }, 500);

        // Auto next song
        const handleEnded = () => handleNext();
        audio.addEventListener('ended', handleEnded);

        return () => {
            clearInterval(interval);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [playing]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                // Do NOT set to null here to avoid conflicts with other cleanups
            }
        };
    }, []);

    const handleNext = () => {
        setCurrentSongIndex((prev) => (prev + 1) % songs.length);
        setPlaying(true);
    };

    const handlePrev = () => {
        setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setPlaying(true);
    };

    const togglePlay = () => {
        setPlaying(!playing);
    };

    const currentSong = songs[currentSongIndex];

    return (
        <div className="bg-gray-300 p-2 select-none">
            <div className="bg-black border-2 border-gray-500 p-2 mb-2">
                <div className="text-green-500 font-mono text-xs mb-1">WINAMP 1.0</div>
                <div className="text-green-400 font-mono text-sm scrolling-text truncate">
                    {currentSong.title}
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <span className="text-green-500 text-xs">
                        {audioRef.current ? formatTime(audioRef.current.currentTime) : "00:00"}
                    </span>
                    <div className="h-2 flex-1 bg-gray-800 relative cursor-pointer" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        if (audioRef.current) {
                            audioRef.current.currentTime = percent * audioRef.current.duration;
                            setProgress(percent * 100);
                        }
                    }}>
                        <div style={{ width: `${progress}%` }} className="h-full bg-green-500/50"></div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <Button95 onClick={handlePrev}><SkipBack size={14} /></Button95>
                <Button95 onClick={togglePlay}>
                    {playing ? <Square size={14} fill="black" /> : <Play size={14} fill="black" />}
                </Button95>
                <Button95 onClick={handleNext}><SkipForward size={14} /></Button95>
            </div>
        </div>
    );
};

const SnakeGame = () => {
    const GRID_SIZE = 15;
    const INITIAL_SNAKE = [{ x: 7, y: 7 }];
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 10, y: 10 });
    const [dir, setDir] = useState({ x: 1, y: 0 }); // Moving right
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const gameLoopRef = useRef();

    const moveSnake = () => {
        if (gameOver) return;

        setSnake(prev => {
            const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };

            // Check walls
            if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                setGameOver(true);
                return prev;
            }

            // Check self
            if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                setGameOver(true);
                return prev;
            }

            const newSnake = [newHead, ...prev];

            // Eat Food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 1);
                setFood({
                    x: Math.floor(Math.random() * GRID_SIZE),
                    y: Math.floor(Math.random() * GRID_SIZE)
                });
            } else {
                newSnake.pop(); // Remove tail
            }

            return newSnake;
        });
    };

    useEffect(() => {
        const handleKey = (e) => {
            switch (e.key) {
                case 'ArrowUp': if (dir.y === 0) setDir({ x: 0, y: -1 }); break;
                case 'ArrowDown': if (dir.y === 0) setDir({ x: 0, y: 1 }); break;
                case 'ArrowLeft': if (dir.x === 0) setDir({ x: -1, y: 0 }); break;
                case 'ArrowRight': if (dir.x === 0) setDir({ x: 1, y: 0 }); break;
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [dir]);

    useEffect(() => {
        if (!gameOver) {
            gameLoopRef.current = setInterval(moveSnake, 200);
        }
        return () => clearInterval(gameLoopRef.current);
    }, [dir, gameOver, food]); // Re-bind when deps change

    const restart = () => {
        setSnake(INITIAL_SNAKE);
        setScore(0);
        setGameOver(false);
        setDir({ x: 1, y: 0 });
    };

    return (
        <div className="bg-gray-800 p-2 flex flex-col items-center">
            <div className="mb-2 text-green-400 font-mono flex justify-between w-full px-2">
                <span>LOVE LEVEL: {score}</span>
                <span>{gameOver ? "GAME OVER" : "PLAYING"}</span>
            </div>

            <div
                className="relative bg-black border-2 border-gray-600"
                style={{ width: GRID_SIZE * 16, height: GRID_SIZE * 16 }}
            >
                {snake.map((seg, i) => (
                    <div
                        key={i}
                        className="absolute bg-green-500 border border-black"
                        style={{
                            left: seg.x * 16,
                            top: seg.y * 16,
                            width: 16,
                            height: 16
                        }}
                    />
                ))}
                <div
                    className="absolute flex items-center justify-center text-xs animate-pulse"
                    style={{
                        left: food.x * 16,
                        top: food.y * 16,
                        width: 16,
                        height: 16
                    }}
                >
                    ❤️
                </div>

                {gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 flex-col">
                        <span className="text-red-500 font-bold mb-2">CRASHED!</span>
                        <Button95 onClick={restart}>Retry</Button95>
                    </div>
                )}
            </div>
            <div className="text-gray-400 text-xs mt-2">Use Arrow Keys to collect Hearts</div>
        </div>
    );
};

const WebBrowserApp = () => (
    <div className="bg-white h-64 flex flex-col font-sans text-sm">
        <div className="bg-gray-200 border-b border-gray-400 p-1 text-xs text-gray-600 flex gap-2">
            <span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Help</span>
        </div>
        <div className="p-2 border-b border-gray-400 flex gap-2 items-center bg-gray-200">
            <span className="text-xs">Address:</span>
            <div className="bg-white border border-gray-500 px-2 text-xs flex-1">http://www.why-i-love-you.com</div>
        </div>
        <div className="p-4 overflow-y-auto flex-1 bg-white">
            <h1 className="text-xl font-bold text-blue-800 underline mb-4">Top 5 Reasons Why I Love You</h1>
            <ul className="list-disc pl-5 space-y-2">
                <li>You have the cutest smile I've ever seen (v2.0 updated).</li>
                <li>Your laugh fixes all my runtime errors.</li>
                <li>You support me even when my code doesn't compile.</li>
                <li>You look beautiful even in sweatpants.</li>
                <li><span className="text-blue-600 underline cursor-pointer hover:text-red-500">Click here to see more...</span></li>
            </ul>
            <div className="mt-8 border-t border-gray-300 pt-2 text-center text-xs text-gray-500">
                &copy; 1995-2025 My Heart Inc. All rights reserved.
            </div>
        </div>
    </div>
);

// --- Main System Component ---

const OldOS = ({ onUpdateStart }) => {
    const [booted, setBooted] = useState(false);
    const [login, setLogin] = useState(false);
    const [bsod, setBsod] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Window Management
    const [windows, setWindows] = useState([
        // Initial State: No windows open, or maybe a welcome note
    ]);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [startMenuOpen, setStartMenuOpen] = useState(false);

    // --- Update Tracking State ---
    const [featuresUsed, setFeaturesUsed] = useState(new Set());
    const [updateReady, setUpdateReady] = useState(false); // True when all tasks are done
    const [showUpdateModal, setShowUpdateModal] = useState(false); // Modal visibility
    const [showNotification, setShowNotification] = useState(false); // Bubble visibility
    const [installingUpdate, setInstallingUpdate] = useState(false);
    const [updateProgress, setUpdateProgress] = useState(0);

    // Available Apps
    const apps = {
        letter: { id: 'letter', title: 'LoveLetter.txt', icon: FileText, component: LoveLetterApp, initialPos: { x: 50, y: 50 } },
        gallery: { id: 'gallery', title: 'Our Memories', icon: ImageIcon, component: PhotoGalleryApp, initialPos: { x: 100, y: 80 } },
        music: { id: 'music', title: 'WinAmp Player', icon: Music, component: MusicPlayerApp, initialPos: { x: 200, y: 150 } },
        snake: { id: 'snake', title: 'Heart Snake', icon: Cpu, component: SnakeGame, initialPos: { x: 300, y: 100 } },
        browser: { id: 'browser', title: 'Internet Explorer', icon: Globe, component: WebBrowserApp, initialPos: { x: 60, y: 60 } },
        trash: { id: 'trash', title: 'Recycle Bin', icon: Trash2, component: () => <div className="p-4 text-center">My heart is full of your memories, no space for trash!</div>, initialPos: { x: 150, y: 150 } },
    };

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Check for update trigger
    useEffect(() => {
        // If all apps + trash have been opened/clicked
        if (featuresUsed.size >= Object.keys(apps).length && !updateReady && !installingUpdate) {
            // Delay slightly for effect
            setTimeout(() => {
                setUpdateReady(true);
                setShowNotification(true);
            }, 1000);
        }
    }, [featuresUsed, updateReady, installingUpdate]);

    const handleNotificationClick = () => {
        setShowNotification(false);
        setShowUpdateModal(true);
    };

    const handleTrayIconClick = () => {
        setShowUpdateModal(true);
        setShowNotification(false); // Ensure bubble is gone if clicking icon
    };

    const openApp = (appId) => {
        // Track usage
        if (!featuresUsed.has(appId)) {
            setFeaturesUsed(prev => new Set(prev).add(appId));
        }

        if (windows.find(w => w.id === appId)) {
            setActiveWindowId(appId);
            // Bring to top logic handled by z-index in render
            return;
        }
        const app = apps[appId];
        setWindows([...windows, { ...app, pos: app.initialPos, minimized: false }]);
        setActiveWindowId(appId);
        setStartMenuOpen(false);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    const minimizeWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, minimized: true } : w));
        setActiveWindowId(null);
    };

    const moveWindow = (id, newPos) => {
        setWindows(windows.map(w => w.id === id ? { ...w, pos: newPos } : w));
    };

    const handleBsod = () => {
        setBsod(true);
    };

    const initiateUpdate = () => {
        setShowUpdateModal(false);
        setInstallingUpdate(true);

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 8; // Bit faster
            if (progress > 100) progress = 100;
            setUpdateProgress(progress);

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    onUpdateStart && onUpdateStart();
                }, 800);
            }
        }, 200);
    };

    if (installingUpdate) {
        return (
            <div className="fixed inset-0 bg-[#008080] flex items-center justify-center font-sans">
                <div className="bg-gray-300 border-2 border-t-white border-l-white border-b-black border-r-black p-1 shadow-2xl w-80">
                    <div className="bg-[#000080] text-white px-2 py-1 font-bold mb-2 flex items-center gap-2">
                        <Download size={16} /> System Update
                    </div>
                    <div className="p-6 text-center select-none">
                        <p className="mb-4 font-bold text-sm">Installing Love OS v3.0...</p>
                        <div className="w-full h-5 bg-white border-2 border-gray-500 relative p-0.5">
                            <div className="h-full bg-[#000080]" style={{ width: `${updateProgress}%` }}></div>
                        </div>
                        <p className="mt-2 text-xs">{Math.round(updateProgress)}% Copied</p>
                    </div>
                </div>
            </div>
        );
    }

    if (bsod) {
        return (
            <div className="fixed inset-0 bg-[#0000AA] text-white font-mono p-10 flex flex-col items-center justify-center cursor-none select-none">
                <div className="max-w-2xl">
                    <p className="bg-gray-300 text-[#0000AA] inline-block mb-4 px-1">Windows</p>
                    <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD LOVE(01) +</p>
                    <p>00010E36. The current application will be terminated.</p>
                    <br />
                    <p>* Press any key to feel loved.</p>
                    <p>* Press CTRL+ALT+DEL to restart (but I'll still love you).</p>
                    <br />
                    <p className="text-center mt-10 animate-pulse">ERROR: SYSTEM OVERLOADED WITH AFFECTION.</p>
                    <br />
                    <div className="text-center mt-10">
                        <button onClick={() => setBsod(false)} className="border border-white px-4 py-2 hover:bg-white hover:text-blue-800">
                            Restart System
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!booted) {
        return (
            <div className="fixed inset-0 bg-black text-gray-300 font-mono p-8 flex flex-col cursor-wait">
                <div className="animate-pulse">
                    <p>BIOS Date 02/14/25 10:22:00 Ver: 1.0.2</p>
                    <p>CPU: AMD Am486 DX4-100</p>
                    <p>Memory Test: 32768K OK</p>
                    <br />
                    <p>Detecting Heartbeat...</p>
                    <p>Primary Master: LOVE_DRIVE_C</p>
                    <p>Secondary Master: MEMORIES_D</p>
                    <br />
                    <p>Booting LoveOS...</p>
                </div>
                <button
                    onClick={() => setBooted(true)}
                    className="mt-8 border border-gray-500 w-fit px-4 py-1 hover:bg-gray-800"
                >
                    [ PRESS ENTER TO CONTINUE ]
                </button>
            </div>
        );
    }

    if (!login) {
        return (
            <div className="fixed inset-0 bg-[#008080] flex items-center justify-center font-sans">
                <div className="bg-gray-300 border-2 border-t-white border-l-white border-b-black border-r-black p-1 shadow-2xl">
                    <div className="bg-[#000080] text-white px-2 py-1 font-bold mb-4 flex justify-between items-center">
                        <span>Welcome to Windows</span>
                        <X size={16} />
                    </div>
                    <div className="flex gap-4 p-4 items-center">
                        <div className="text-4xl">🔑</div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Type a password to log on to My Heart.</p>
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-bold w-20">User name:</span>
                                <input type="text" value="JooJoo" disabled className="border-2 border-gray-500 px-1 bg-white outline-none text-sm" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="text-xs font-bold w-20">Password:</span>
                                <form onSubmit={(e) => { e.preventDefault(); setLogin(true); }}>
                                    <input type="password" autoFocus className="border-2 border-gray-500 px-1 bg-white outline-none text-sm w-full" />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 p-2 mt-2">
                        <Button95 onClick={() => setLogin(true)} className="w-20 font-bold">OK</Button95>
                        <Button95 onClick={() => alert("Nice try, but you have to log in!")} className="w-20">Cancel</Button95>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-[#008080] overflow-hidden select-none font-sans cursor-default">
            {/* UPDATE CONFIRMATION MODAL */}
            {showUpdateModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
                    <div className="bg-gray-300 border-2 border-t-white border-l-white border-b-black border-r-black p-1 shadow-2xl w-96 animate-pulse-once">
                        <div className="bg-[#000080] text-white px-2 py-1 font-bold mb-4 flex justify-between items-center">
                            <span>System Update</span>
                            <X size={16} className="cursor-pointer" onClick={() => setShowUpdateModal(false)} />
                        </div>
                        <div className="flex gap-4 p-4">
                            <AlertTriangle size={36} className="text-yellow-600 mb-auto shrink-0" />
                            <div className="text-sm">
                                <p className="font-bold mb-2">New Update Available!</p>
                                <p className="mb-4">LoveOS 95 has a major update waiting (Love OS v3.0). It is recommended to update for maximum happiness.</p>
                                <p className="mb-4">Do you want to update now?</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 p-2">
                            <Button95 onClick={initiateUpdate} className="w-24 font-bold">Yes</Button95>
                            <Button95 onClick={() => setShowUpdateModal(false)} className="w-24">Not Now</Button95>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Grid */}
            <div className="p-4 grid grid-flow-col grid-rows-6 gap-6 justify-start content-start h-[calc(100%-40px)] w-full">
                <div onDoubleClick={() => openApp('letter')} className="flex flex-col items-center gap-1 group w-20 cursor-pointer">
                    <FileText size={32} className="text-white drop-shadow-md" />
                    <span className="text-white text-xs text-center px-1 group-hover:bg-[#000080] group-hover:outline-dotted outline-1">LoveLetter.txt</span>
                </div>

                <div onDoubleClick={() => openApp('gallery')} className="flex flex-col items-center gap-1 group w-20 cursor-pointer">
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 animate-ping"></div>
                        <ImageIcon size={32} className="text-yellow-400 drop-shadow-md" />
                    </div>
                    <span className="text-white text-xs text-center px-1 group-hover:bg-[#000080] group-hover:outline-dotted outline-1">Our Photos</span>
                </div>

                <div onDoubleClick={() => openApp('music')} className="flex flex-col items-center gap-1 group w-20 cursor-pointer">
                    <Disc size={32} className="text-gray-300 drop-shadow-md" />
                    <span className="text-white text-xs text-center px-1 group-hover:bg-[#000080] group-hover:outline-dotted outline-1">Media Player</span>
                </div>

                <div onDoubleClick={() => openApp('snake')} className="flex flex-col items-center gap-1 group w-20 cursor-pointer">
                    <Cpu size={32} className="text-green-300 drop-shadow-md" />
                    <span className="text-white text-xs text-center px-1 group-hover:bg-[#000080] group-hover:outline-dotted outline-1">Snake Game</span>
                </div>

                <div onDoubleClick={() => openApp('browser')} className="flex flex-col items-center gap-1 group w-20 cursor-pointer">
                    <Globe size={32} className="text-blue-300 drop-shadow-md" />
                    <span className="text-white text-xs text-center px-1 group-hover:bg-[#000080] group-hover:outline-dotted outline-1">Internet</span>
                </div>

                <div onDoubleClick={() => openApp('trash')} className="flex flex-col items-center gap-1 group w-20 cursor-pointer">
                    <Trash2 size={32} className="text-gray-400 drop-shadow-md" />
                    <span className="text-white text-xs text-center px-1 group-hover:bg-[#000080] group-hover:outline-dotted outline-1">Recycle Bin</span>
                </div>

                <div onClick={handleBsod} className="flex flex-col items-center gap-1 group w-20 cursor-pointer mt-10">
                    <div className="bg-red-600 p-1 border border-white">
                        <Power size={24} className="text-white" />
                    </div>
                    <span className="text-white text-xs text-center px-1 group-hover:bg-[#000080] group-hover:outline-dotted outline-1">DO NOT CLICK</span>
                </div>
            </div>

            {/* Windows Layer */}
            {windows.map((win) => (
                !win.minimized && (
                    <WindowFrame
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        position={win.pos}
                        isActive={activeWindowId === win.id}
                        onFocus={() => setActiveWindowId(win.id)}
                        onClose={() => closeWindow(win.id)}
                        onMinimize={() => minimizeWindow(win.id)}
                        onMove={moveWindow}
                    >
                        <win.component onOpenApp={openApp} />
                    </WindowFrame>
                )
            ))}

            {/* Taskbar */}
            <div className="absolute bottom-0 w-full h-10 bg-gray-300 border-t-2 border-white flex items-center p-1 gap-1 z-[100] overflow-visible">
                <Button95
                    onClick={() => setStartMenuOpen(!startMenuOpen)}
                    active={startMenuOpen}
                    className="font-bold flex gap-1 px-3 py-1 mr-2"
                >
                    <img src="https://img.icons8.com/color/48/windows-logo.png" className="w-5 h-5" alt="win" />
                    Start
                </Button95>

                {/* Open Windows in Taskbar */}
                <div className="flex-1 flex gap-1 overflow-x-auto">
                    {windows.map(win => (
                        <Button95
                            key={win.id}
                            active={activeWindowId === win.id && !win.minimized}
                            onClick={() => {
                                if (activeWindowId === win.id && !win.minimized) {
                                    minimizeWindow(win.id);
                                } else {
                                    setActiveWindowId(win.id);
                                    setWindows(prev => prev.map(w => w.id === win.id ? { ...w, minimized: false } : w));
                                }
                            }}
                            className="min-w-[120px] max-w-[150px] justify-start px-2 text-xs truncate font-sans"
                        >
                            <win.icon size={14} className="mr-2" />
                            {win.title}
                        </Button95>
                    ))}
                </div>

                {/* System Tray */}
                <div className="border-2 border-t-gray-500 border-l-gray-500 border-b-white border-r-white px-2 py-1 flex gap-2 items-center bg-gray-300 relative">
                    {/* Update Notification Bubble */}
                    {showNotification && (
                        <div
                            onClick={handleNotificationClick}
                            className="absolute bottom-full right-0 mb-2 w-48 bg-[#ffffe1] border border-black p-2 text-xs text-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col gap-1 z-[200]"
                        >
                            <div className="flex items-center gap-1 font-bold">
                                <AlertTriangle size={12} className="text-yellow-600" /> Update Available
                            </div>
                            <p>New updates are available for your heart. Click here to install.</p>
                        </div>
                    )}

                    {/* Update Icon (Only visible when update is ready) */}
                    {updateReady && (
                        <div onClick={handleTrayIconClick} className="cursor-pointer hover:bg-gray-400 p-0.5 rounded-sm">
                            <Download size={14} className="text-blue-600 animate-bounce" />
                        </div>
                    )}

                    <Heart size={14} className="text-red-500 animate-pulse" fill="red" />
                    <span className="text-xs font-sans">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Start Menu */}
            {startMenuOpen && (
                <div className="absolute bottom-10 left-1 w-48 bg-gray-300 border-2 border-t-white border-l-white border-b-black border-r-black shadow-xl z-[101] flex flex-row">
                    <div className="bg-[#000080] w-8 flex items-end">
                        <span className="-rotate-90 text-white font-bold text-xl mb-4 whitespace-nowrap tracking-widest">LOVE 95</span>
                    </div>
                    <div className="flex-1 py-1">
                        {Object.values(apps).map(app => (
                            <div
                                key={app.id}
                                onClick={() => openApp(app.id)}
                                className="px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer"
                            >
                                <app.icon size={20} />
                                <span className="text-sm">{app.title.split('.')[0]}</span>
                            </div>
                        ))}
                        <div className="border-t border-gray-400 my-1 mx-2"></div>
                        <div onClick={() => window.location.reload()} className="px-4 py-2 hover:bg-[#000080] hover:text-white flex items-center gap-3 cursor-pointer">
                            <Power size={20} />
                            <span className="text-sm">Shut Down...</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OldOS;
