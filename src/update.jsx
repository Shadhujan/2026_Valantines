import React, { useState, useEffect, useRef } from 'react';
import {
    Heart,
    FileText,
    Image as ImageIcon,
    Music,
    X,
    Minus,
    Maximize2,
    MessageCircle,
    Gift,
    Smile,
    Calendar,
    Settings,
    Unlock,
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Send,
    Coffee,
    Cpu,
    Globe,
    AlertTriangle,
    RefreshCw,
    Trash2,
    Star,
    Sparkles,
    Map,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

/* --- LOVE OS v3.0 (CUTE EDITION) --- 
   Features: Draggable Icons + Floating Hearts + Soft Aesthetic
*/

// --- Styling Constants & Theme Config ---

const THEMES = {
    love: {
        id: 'love',
        primary: 'from-pink-400 to-rose-400',
        secondary: 'bg-white text-pink-500 hover:bg-pink-50 border-pink-100',
        accent: 'text-pink-500',
        accentBg: 'bg-pink-100',
        windowBorder: 'border-pink-100/50',
        windowTitleBar: 'bg-pink-50/50',
        wallpaper: [
            "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200 via-purple-200 to-indigo-100",
            "bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-rose-100 via-teal-50 to-emerald-100",
            "bg-gradient-to-t from-orange-100 to-sky-100"
        ],
        glass: "bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_32px_rgba(255,105,180,0.15)]",
        icon: '❤️',
        particle: ['❤️', '💖', '💕']
    },
    plant: {
        id: 'plant',
        primary: 'from-emerald-500 to-teal-600',
        secondary: 'bg-white text-emerald-600 hover:bg-emerald-50 border-emerald-100',
        accent: 'text-emerald-600',
        accentBg: 'bg-emerald-100',
        windowBorder: 'border-emerald-100/50',
        windowTitleBar: 'bg-emerald-50/50',
        wallpaper: [
            "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-200 via-emerald-100 to-teal-50",
            "bg-[radial-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-lime-100 via-green-100 to-emerald-200",
            "bg-gradient-to-br from-green-50 to-emerald-100"
        ],
        glass: "bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_8px_32px_rgba(16,185,129,0.15)]",
        icon: '🌿',
        particle: ['🍃', '🌿', '🌱', '🍀']
    }
};

const ThemeContext = React.createContext({
    theme: THEMES.love,
    toggleTheme: () => { }
});

const useTheme = () => React.useContext(ThemeContext);

const POP_BUTTON = "transform active:scale-90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:rotate-1";

// --- Animated Components ---

const FloatingParticles = () => {
    const { theme } = useTheme();
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(current => {
                const newParticle = {
                    id: Date.now(),
                    left: Math.random() * 100,
                    animationDuration: 10 + Math.random() * 10,
                    size: 10 + Math.random() * 15,
                    opacity: 0.3 + Math.random() * 0.5,
                    char: theme.particle[Math.floor(Math.random() * theme.particle.length)]
                };
                const filtered = current.filter(p => Date.now() - p.id < p.animationDuration * 1000);
                return [...filtered, newParticle];
            });
        }, 800);
        return () => clearInterval(interval);
    }, [theme]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="absolute pointer-events-none select-none transition-colors duration-1000"
                    style={{
                        left: `${p.left}%`,
                        bottom: '-20px',
                        fontSize: `${p.size}px`,
                        opacity: p.opacity,
                        animation: `floatUp ${p.animationDuration}s linear forwards`,
                        color: theme.id === 'plant' ? '#10b981' : '#f9a8d4' // Emerald or Pink-300
                    }}
                >
                    {p.char}
                </div>
            ))}
            <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
};

const VineBorder = () => {
    const { theme } = useTheme();
    if (theme.id !== 'plant') return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Top Left Vine */}
            <svg className="absolute top-0 left-0 w-64 h-64 text-emerald-400/40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0,0 Q50,10 40,60 T80,90" />
                <path d="M0,20 Q30,30 20,70" />
                <circle cx="40" cy="60" r="3" fill="currentColor" className="animate-pulse" />
                <circle cx="80" cy="90" r="2" fill="currentColor" />
                <path d="M40,60 L50,50 M40,60 L30,50" strokeWidth="1" />
            </svg>
            {/* Top Right Vine */}
            <svg className="absolute top-0 right-0 w-64 h-64 text-emerald-400/40 transform scale-x-[-1]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M0,0 Q50,10 40,60 T80,90" />
                <path d="M0,20 Q30,30 20,70" />
                <circle cx="40" cy="60" r="3" fill="currentColor" className="animate-pulse" />
            </svg>
            {/* Bottom Vines */}
            <svg className="absolute bottom-0 left-0 w-full h-24 text-emerald-600/20" preserveAspectRatio="none" viewBox="0 0 1200 100">
                <path d="M0,100 C150,50 300,100 450,60 C600,20 750,80 900,40 C1050,0 1200,100 1200,100 V120 H0 Z" fill="currentColor" />
            </svg>
        </div>
    );
};

// --- Utility Components ---

const CuteButton = ({ children, onClick, className = "", variant = "primary" }) => {
    const { theme } = useTheme();

    // Dynamic variants based on theme
    const variants = {
        primary: `bg-gradient-to-r ${theme.primary} text-white shadow-md`,
        secondary: `bg-white ${theme.id === 'plant' ? 'text-emerald-600 border-emerald-100 hover:bg-emerald-50' : 'text-pink-500 border-pink-100 hover:bg-pink-50'} border-2`,
        ghost: "bg-transparent hover:bg-white/40 text-gray-600",
        icon: `p-2 rounded-full hover:bg-white/60 ${theme.id === 'plant' ? 'text-emerald-500' : 'text-pink-500'} bg-white/40 backdrop-blur-sm`,
        danger: "bg-red-400 text-white hover:bg-red-500"
    };

    return (
        <button onClick={onClick} className={`${className} px-4 py-2 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${POP_BUTTON} ${variants[variant] || variants.primary}`}>
            {children}
        </button>
    );
};

const WindowFrame = ({ title, onClose, onMinimize, children, isActive, onFocus, position, onMove, id, size, onResize }) => {
    const { theme } = useTheme();
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 });

    const handleMouseDown = (e) => {
        onFocus();
        if (e.target.closest('.window-content') || e.target.closest('.window-control')) return;
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleResizeStart = (e) => {
        e.stopPropagation();
        onFocus();
        setIsResizing(true);
        setResizeStart({
            x: e.clientX,
            y: e.clientY,
            w: size.width,
            h: size.height
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
            if (isResizing) {
                onResize(id, {
                    width: Math.max(300, resizeStart.w + (e.clientX - resizeStart.x)),
                    height: Math.max(200, resizeStart.h + (e.clientY - resizeStart.y))
                });
            }
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, dragOffset, resizeStart, id, onMove, onResize]);

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                left: position.x,
                top: position.y,
                width: size ? size.width : "20rem",
                height: size ? size.height : "auto",
                zIndex: isActive ? 50 : 10
            }}
            className={`absolute flex flex-col overflow-hidden transition-all duration-300 rounded-3xl ${theme.glass} ${isActive ? `shadow-2xl ring-4 ring-white/50` : 'opacity-90'}`}
        >
            {/* Title Bar */}
            <div className={`h-12 flex justify-between items-center px-4 cursor-move ${theme.windowTitleBar} ${theme.windowBorder} border-b select-none shrink-0 window-handle`}>
                <span className="font-bold text-gray-600 text-sm flex items-center gap-2">
                    <span className={theme.accent}>{theme.icon}</span> {title}
                </span>
                <div className="flex gap-2 group window-control">
                    <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3 h-3 rounded-full bg-yellow-300 hover:scale-125 transition-transform shadow-sm" />
                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3 h-3 rounded-full bg-red-300 hover:scale-125 transition-transform shadow-sm" />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto text-gray-600 relative bg-white/40 window-content">
                {children}
            </div>

            {/* Resize Handle */}
            <div
                onMouseDown={handleResizeStart}
                className={`absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center ${theme.accent} hover:scale-110 z-50`}
            >
                <Maximize2 size={12} className="transform rotate-90" />
            </div>
        </div>
    );
};

// --- Applications ---

const NotesApp = () => {
    const { theme } = useTheme();
    return (
        <div className={`p-6 ${theme.id === 'plant' ? 'bg-amber-50/50' : 'bg-yellow-50/50'} h-full min-h-[300px] font-serif text-gray-700 relative`}>
            <div className={`absolute top-0 left-0 w-full h-8 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.5)_10px,rgba(255,255,255,0.5)_20px)] opacity-50`}></div>
            <div className="flex justify-center mb-4">
                <div className={`${theme.accentBg} px-3 py-1 rounded-full text-xs ${theme.accent} font-bold uppercase tracking-widest`}>
                    {theme.id === 'plant' ? 'Nature Note' : 'Love Letter'}
                </div>
            </div>
            <h2 className={`text-3xl font-bold ${theme.accent} mb-6 text-center italic`}>My Dearest,</h2>
            <p className="leading-relaxed mb-4 text-lg">
                I wanted to make something that feels as beautiful as you make my life feel.
            </p>
            <p className="leading-relaxed mb-4 text-lg">
                Every pixel here was coded with you in mind. You're my favorite notification, my best view, and my home screen.
            </p>
            <div className="mt-8 flex justify-end">
                <div className="rotate-3">
                    <p className={`font-bold ${theme.id === 'plant' ? 'text-emerald-500' : 'text-pink-400'} text-xl font-handwriting`}>Love,</p>
                    <p className="font-bold text-gray-600">Your Dev Boyfriend (Bubu)</p>
                </div>
            </div>
        </div>
    );
};

const RecycleBinApp = () => {
    const { theme } = useTheme();
    return (
        <div className="p-8 h-full flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28 bg-white/50 rounded-full flex items-center justify-center mb-6 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] ring-4 ring-white">
                <Trash2 size={48} className={theme.id === 'plant' ? 'text-emerald-300' : 'text-pink-300'} />
            </div>
            <h2 className="text-xl font-bold text-gray-600 mb-2">{theme.id === 'plant' ? 'Compost Bin' : 'My Love for You'}</h2>
            <p className={`text-gray-500 max-w-xs text-sm ${theme.id === 'plant' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} p-4 rounded-xl border`}>
                <strong className={`${theme.id === 'plant' ? 'text-emerald-400' : 'text-red-400'} block mb-1`}>Warning:</strong>
                {theme.id === 'plant' ? 'Turning bad vibes into good memories.' : 'Cannot delete. This file is write-protected and infinitely large.'}
            </p>
            <div className="mt-8 text-xs text-gray-400 font-mono">Status: PERMANENT</div>
        </div>
    );
};

const GalleryApp = () => {
    const { theme } = useTheme();
    const photos = [
        { color: theme.id === 'plant' ? "bg-emerald-200" : "bg-rose-200", caption: "First Date 🍝" },
        { color: theme.id === 'plant' ? "bg-teal-200" : "bg-blue-200", caption: "Beach Day 🌊" },
        { color: theme.id === 'plant' ? "bg-green-200" : "bg-purple-200", caption: "Hiking 🌲" },
        { color: theme.id === 'plant' ? "bg-lime-200" : "bg-yellow-200", caption: "Just Us ❤️" },
    ];

    return (
        <div className="p-4 grid grid-cols-2 gap-4 h-full">
            {photos.map((p, i) => (
                <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-white p-2 hover:-rotate-2 hover:scale-105 z-0 hover:z-10">
                    <div className={`w-full h-full rounded-xl ${p.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                        {/* Replace with <img src="..." className="w-full h-full object-cover rounded-xl" /> */}
                        <div className="w-full h-full flex items-center justify-center text-white/50">
                            <ImageIcon />
                        </div>
                    </div>
                    <div className="absolute inset-x-2 bottom-2 bg-white/90 backdrop-blur-sm rounded-lg py-2 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-gray-600 text-xs font-bold">
                            {p.caption}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const MusicApp = () => {
    const { theme } = useTheme();
    const bgGradient = theme.id === 'plant' ? 'from-teal-400/90 to-emerald-400/90' : 'from-indigo-400/90 to-purple-400/90';

    return (
        <div className={`bg-gradient-to-br ${bgGradient} p-6 text-white h-full flex flex-col items-center justify-center relative overflow-hidden`}>

            <div className="w-40 h-40 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] mb-8 bg-white/20 backdrop-blur-md flex items-center justify-center animate-[spin_8s_linear_infinite]">
                <Music size={56} className="text-white" />
            </div>

            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold tracking-tight">Perfect</h3>
                <p className="text-white/80 text-sm font-medium tracking-widest uppercase mt-1">Ed Sheeran</p>
            </div>

            <div className="w-full bg-white/20 rounded-full h-1.5 mb-2 overflow-hidden">
                <div className="h-full w-1/3 bg-white rounded-full shadow-[0_0_10px_white]"></div>
            </div>
            <div className="flex justify-between w-full text-[10px] font-bold text-white/60 mb-8 uppercase tracking-wider">
                <span>1:12</span>
                <span>4:23</span>
            </div>

            <div className="flex items-center gap-8">
                <button className={`hover:${theme.id === 'plant' ? 'text-emerald-200' : 'text-pink-200'} transition-colors transform hover:scale-110`}><SkipBack fill="currentColor" size={24} /></button>
                <button className={`w-16 h-16 bg-white ${theme.id === 'plant' ? 'text-emerald-500' : 'text-purple-500'} rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all active:scale-95`}>
                    <Play fill="currentColor" className="ml-1" size={28} />
                </button>
                <button className={`hover:${theme.id === 'plant' ? 'text-emerald-200' : 'text-pink-200'} transition-colors transform hover:scale-110`}><SkipForward fill="currentColor" size={24} /></button>
            </div>
        </div>
    );
};

const CouponApp = () => {
    const { theme } = useTheme();
    const [coupons, setCoupons] = useState([
        { id: 1, title: "Back Massage", icon: "💆‍♀️", redeemed: false },
        { id: 2, title: "Dinner Date", icon: "🍝", redeemed: false },
        { id: 3, title: "Movie Night", icon: "🎬", redeemed: false },
        { id: 4, title: "Yes Day", icon: "✨", redeemed: false },
    ]);

    const redeem = (id) => {
        setCoupons(c => c.map(cp => cp.id === id ? { ...cp, redeemed: true } : cp));
    };

    return (
        <div className="p-6 h-full overflow-y-auto">
            <div className="text-center mb-6">
                <div className={`inline-block p-3 ${theme.accentBg} rounded-full mb-2`}>
                    <Gift size={24} className={theme.accent} />
                </div>
                <h3 className="text-gray-700 font-bold text-lg">{theme.id === 'plant' ? 'Care Coupons' : 'Love Coupons'}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Tap to redeem a treat!</p>
            </div>
            <div className="space-y-4">
                {coupons.map(c => (
                    <div key={c.id} className={`group relative p-4 rounded-2xl border-2 border-dashed transition-all duration-300 ${c.redeemed ? 'border-gray-200 bg-gray-50 opacity-60 grayscale' : `${theme.id === 'plant' ? 'border-emerald-200 hover:border-emerald-400' : 'border-pink-200 hover:border-pink-400'} bg-white hover:shadow-lg hover:-translate-y-1`}`}>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <span className="text-3xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full shadow-sm">{c.icon}</span>
                                <div>
                                    <span className={`font-bold block ${c.redeemed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{c.title}</span>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">{c.redeemed ? 'Redeemed' : 'Valid Forever'}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => !c.redeemed && redeem(c.id)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide transition-all ${c.redeemed ? 'bg-transparent text-gray-400 cursor-default border border-gray-200' : `${theme.id === 'plant' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' : 'bg-pink-500 hover:bg-pink-600 shadow-pink-200'} text-white shadow-md hover:shadow-lg`}`}
                            >
                                {c.redeemed ? 'Used' : 'Use'}
                            </button>
                        </div>
                        {/* Decoration */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-100 rounded-full"></div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-100 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChatApp = () => {
    const { theme } = useTheme();
    return (
        <div className="flex flex-col h-full bg-white/50">
            <div className="p-4 border-b border-gray-100/50 flex items-center gap-3 bg-white/40 backdrop-blur-md">
                <div className="relative">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${theme.id === 'plant' ? 'from-emerald-300 to-teal-300' : 'from-pink-300 to-purple-300'} flex items-center justify-center text-white font-bold shadow-md`}>BF</div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-700">Boyfriend {theme.icon}</h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Always Online</span>
                </div>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <div className="flex justify-start">
                    <div className="bg-white text-gray-600 px-4 py-2 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] text-sm border border-gray-100">
                        Happy Valentine's Day babe! {theme.id === 'plant' ? '🪴' : '🌹'}
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className={`bg-gradient-to-r ${theme.primary} text-white px-4 py-2 rounded-2xl rounded-tr-sm shadow-md ${theme.id === 'plant' ? 'shadow-emerald-200' : 'shadow-pink-200'} max-w-[85%] text-sm`}>
                        Aww thank you! I love you! {theme.icon}
                    </div>
                </div>
                <div className="flex justify-start">
                    <div className="bg-white text-gray-600 px-4 py-2 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] text-sm border border-gray-100">
                        I made this website just for you. Hope you like it! <br />
                        Try dragging the icons around!
                    </div>
                </div>
            </div>
            <div className="p-3 border-t border-gray-100/50 flex gap-2 bg-white/40">
                <input type="text" placeholder="Send a message..." disabled className="flex-1 bg-white rounded-full px-4 py-2 text-sm outline-none shadow-sm text-gray-500 border border-gray-100" />
                <button className={`w-9 h-9 rounded-full ${theme.id === 'plant' ? 'bg-emerald-500 shadow-emerald-200' : 'bg-pink-500 shadow-pink-200'} text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                    <Send size={16} className="ml-0.5" />
                </button>
            </div>
        </div>
    );
};

const SnakeGameApp = () => {
    const { theme } = useTheme();
    const GRID_SIZE = 15;
    const INITIAL_SNAKE = [{ x: 7, y: 7 }];
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 10, y: 10 });
    const [dir, setDir] = useState({ x: 1, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const gameLoopRef = useRef();

    const moveSnake = () => {
        if (gameOver) return;

        setSnake(prev => {
            const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };

            if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                setGameOver(true);
                return prev;
            }
            if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                setGameOver(true);
                return prev;
            }

            const newSnake = [newHead, ...prev];
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 1);
                setFood({
                    x: Math.floor(Math.random() * GRID_SIZE),
                    y: Math.floor(Math.random() * GRID_SIZE)
                });
            } else {
                newSnake.pop();
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
    }, [dir, gameOver, food]);

    const restart = () => {
        setSnake(INITIAL_SNAKE);
        setScore(0);
        setGameOver(false);
        setDir({ x: 1, y: 0 });
    };

    return (
        <div className="bg-white/50 p-4 h-full flex flex-col items-center justify-center">
            <div className="mb-4 flex justify-between w-full px-4 items-center max-w-[300px]">
                <span className={`font-bold ${theme.accent} ${theme.accentBg} px-3 py-1 rounded-full text-xs uppercase tracking-wide`}>Score: {score}</span>
                <button onClick={restart} className={`text-[10px] font-bold bg-white px-3 py-1 rounded-full shadow-sm text-gray-400 hover:${theme.accent} uppercase tracking-wide border border-gray-100 hover:${theme.id === 'plant' ? 'border-emerald-200' : 'border-pink-200'} transition-colors`}>Restart</button>
            </div>

            <div
                className={`relative bg-white rounded-2xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border-4 border-white overflow-hidden ring-4 ${theme.id === 'plant' ? 'ring-emerald-100' : 'ring-pink-100'}`}
                style={{ width: GRID_SIZE * 18, height: GRID_SIZE * 18 }}
            >
                {snake.map((seg, i) => (
                    <div
                        key={i}
                        className={`absolute bg-gradient-to-br ${theme.primary} rounded-sm shadow-sm`}
                        style={{
                            left: seg.x * 18,
                            top: seg.y * 18,
                            width: 17,
                            height: 17,
                            opacity: 1 - (i / snake.length) * 0.4,
                            borderRadius: i === 0 ? '4px 4px 2px 2px' : '2px'
                        }}
                    />
                ))}
                <div
                    className="absolute flex items-center justify-center text-sm animate-bounce drop-shadow-md"
                    style={{ left: food.x * 18, top: food.y * 18, width: 18, height: 18 }}
                >
                    {theme.id === 'plant' ? '🍎' : '❤️'}
                </div>

                {gameOver && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm flex-col z-10">
                        <span className="text-rose-500 font-black mb-2 text-2xl tracking-tight">GAME OVER</span>
                        <CuteButton onClick={restart}>Try Again</CuteButton>
                    </div>
                )}
            </div>
            <p className="text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full">Arrow Keys to Move</p>
        </div>
    );
};

const BrowserApp = ({ onOpenApp }) => {
    const { theme } = useTheme();
    return (
        <div className="flex flex-col h-full bg-white/80">
            {/* Browser Bar */}
            <div className="p-3 bg-white/80 border-b border-gray-100 flex flex-col gap-2 shadow-sm z-10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 mr-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-300"></div>
                    </div>
                    <div className="flex-1 bg-gray-50/50 border border-gray-100 rounded-full px-4 py-1.5 text-xs text-gray-400 flex items-center gap-2 font-mono">
                        <Unlock size={10} className={theme.id === 'plant' ? 'text-emerald-300' : 'text-pink-300'} />
                        <span>lovelanguage.com/reasons-why</span>
                    </div>
                    <RefreshCw size={14} className="text-gray-400 hover:rotate-180 transition-transform duration-500 cursor-pointer" />
                </div>

                {/* Bookmarks Bar */}
                <div className="flex gap-2 text-xs text-gray-500 font-medium">
                    <button className="hover:bg-gray-100 px-2 py-1 rounded flex items-center gap-1 transition-colors">
                        <Star size={10} className="text-yellow-400 fill-yellow-400" /> Favorites
                    </button>
                    <div className="w-px h-4 bg-gray-300 my-auto"></div>

                    {/* Pumpkin App Bookmark */}
                    <button
                        onClick={() => onOpenApp && onOpenApp('pumpkin')}
                        className={`hover:${theme.accentBg} hover:${theme.accent} px-2 py-1 rounded flex items-center gap-1 transition-colors group`}
                    >
                        <Heart size={10} className={`${theme.id === 'plant' ? 'text-emerald-300' : 'text-pink-300'} group-hover:${theme.accent} transition-colors`} />
                        My Pumpkin
                    </button>
                </div>
            </div>

            {/* Web Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-md mx-auto">
                    <h1 className={`text-3xl font-bold text-gray-800 mb-8 border-b-4 ${theme.id === 'plant' ? 'border-emerald-100' : 'border-pink-100'} pb-2 inline-block`}>Top Reasons <span className={theme.accent}>I {theme.icon} U</span></h1>

                    <div className="space-y-6">
                        <div className="flex gap-5 items-start group">
                            <div className={`w-10 h-10 rounded-2xl ${theme.accentBg} flex items-center justify-center ${theme.accent} font-bold shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>1</div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 group-hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-gray-700 mb-1">Your Smile (v2.0)</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">It literally lights up the room. No CSS required.</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-start group">
                            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-500 font-bold shrink-0 shadow-sm group-hover:scale-110 transition-transform">2</div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 group-hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-gray-700 mb-1">Debugging Life</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">You help me fix my problems even when I don't have a console log.</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-start group">
                            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 font-bold shrink-0 shadow-sm group-hover:scale-110 transition-transform">3</div>
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex-1 group-hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-gray-700 mb-1">Comfy Mode</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">You look beautiful in a dress, but even better in my hoodie.</p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 mt-10 text-center">
                            <div className="mx-auto bg-white w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm text-2xl">🍪</div>
                            <h4 className="text-blue-600 font-bold mb-1 text-sm">Cookie Policy</h4>
                            <p className="text-xs text-blue-400 mb-4">This website uses cookies to store all my love for you.</p>
                            <button className="bg-blue-500 text-white text-xs px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-200 hover:scale-105 transition-transform">Accept All Love</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoveQuestApp = () => {
    const { theme } = useTheme();
    const [gameState, setGameState] = useState('welcome'); // welcome, playing, reward, final
    const [level, setLevel] = useState(0);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    // --- MERGED GAME CONTENT ---
    const levels = [
        {
            id: 1,
            type: 'quiz',
            title: "Level 1: The Beginning",
            question: "Where did we go for our first proper date?",
            hint: "(Type 'cafe' for demo)",
            answer: ["cafe", "coffee", "starbucks"],
            memory: "I was so nervous, but your smile made everything perfect.",
            rewardImage: "https://images.unsplash.com/photo-1504194569255-d8641bc3864a?w=400",
            bg: "bg-orange-100"
        },
        {
            id: 2,
            type: 'find',
            title: "Level 2: Hidden Love",
            question: theme.id === 'plant' ? "Find the unique leaf hidden among the broken ones!" : "Find the unique heart hidden among the broken ones!",
            gridSize: 25,
            targetIndex: 12,
            memory: "You healed my heart just like you found this one.",
            rewardImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b9?w=400",
            bg: theme.id === 'plant' ? "bg-emerald-100" : "bg-pink-100"
        },
        {
            id: 3,
            type: 'quiz',
            title: "Level 3: The Favorite",
            question: "What is my absolute favorite food? 🍕🍔",
            hint: "(Type 'pizza' for demo)",
            answer: ["pizza", "burger", "sushi"],
            memory: "I love sharing meals (and slices) with you.",
            rewardImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
            bg: "bg-yellow-100"
        },
        {
            id: 4,
            type: 'quiz',
            title: "Level 4: The Song",
            question: "Which artist do we always sing along to?",
            hint: "(Rhymes with Bed Sheeran)",
            answer: ["ed sheeran", "taylor swift", "adele", "weeknd"],
            memory: "Every love song makes sense now that I have you.",
            rewardImage: "https://images.unsplash.com/photo-1514525253440-b393452e8d03?w=400",
            bg: "bg-purple-100"
        }
    ];

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        const currentQ = levels[level];
        if (currentQ.answer.some(a => input.toLowerCase().includes(a))) {
            setGameState('reward');
            setError("");
        } else {
            setError("Not quite! Try again " + theme.icon);
        }
    };

    const nextLevel = () => {
        setInput("");
        if (level + 1 < levels.length) {
            setLevel(level + 1);
            setGameState('playing');
        } else {
            setGameState('final');
        }
    };

    // --- RENDERING SCREENS ---

    // 1. Welcome Screen
    if (gameState === 'welcome') return (
        <div className="p-8 h-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50 to-pink-50">
            <div className={`w-24 h-24 ${theme.accentBg} rounded-full flex items-center justify-center mb-6 animate-bounce shadow-md`}>
                <Map size={48} className={theme.accent} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">The Love Quest</h2>
            <p className="text-gray-500 mb-8 max-w-xs">A mini adventure through our memories. Solve clues to unlock my heart!</p>
            <CuteButton onClick={() => setGameState('playing')} className="text-lg px-8 py-3">Start Adventure</CuteButton>
        </div>
    );

    // 2. Final Reward Screen (Merged: Voucher + Valentine Proposal)
    if (gameState === 'final') return (
        <div className={`p-8 h-full flex flex-col items-center justify-center text-center bg-gradient-to-br ${theme.id === 'plant' ? 'from-emerald-100 to-green-50' : 'from-rose-100 to-pink-50'} overflow-hidden relative`}>
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="absolute animate-pulse text-2xl" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s` }}>{theme.icon}</div>
                ))}
            </div>
            <Sparkles size={48} className="text-yellow-400 mb-4 animate-spin-slow" />
            <h2 className={`text-3xl font-extrabold ${theme.id === 'plant' ? 'text-emerald-600' : 'text-pink-600'} mb-4`}>Quest Complete! 🎉</h2>

            <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl transform rotate-1 border-4 ${theme.id === 'plant' ? 'border-emerald-200' : 'border-pink-200'} mb-6 max-w-sm`}>
                <p className="font-handwriting text-xl text-gray-700 mb-4">
                    "You know me better than anyone else. Thank you for being my player 2."
                </p>
                <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Reward Unlocked</p>
                    <div className={`font-bold text-xl ${theme.accent} ${theme.accentBg} py-2 rounded-lg border ${theme.windowBorder}`}>Dinner Date Voucher 🎟️</div>
                    <p className="text-[10px] text-gray-500 mt-1">Valid: Forever</p>
                </div>
                <div className="mt-6">
                    <p className="font-bold text-gray-800 text-xl mb-4">Will you be my Valentine?</p>
                    <CuteButton onClick={() => alert("Yay! I love you! " + theme.icon)} className={`w-full ${theme.id === 'plant' ? 'shadow-emerald-300' : 'shadow-pink-300'}`}>YES! 💘</CuteButton>
                </div>
            </div>
            <CuteButton onClick={() => { setLevel(0); setGameState('welcome'); }} variant="ghost" className="text-xs">Play Again</CuteButton>
        </div>
    );

    // 3. Reward/Memory Screen (Merged: Polaroid Image + Memory Text)
    if (gameState === 'reward') {
        const current = levels[level];
        return (
            <div className={`p-6 h-full flex flex-col items-center overflow-y-auto ${current.bg}`}>
                <div className="w-full bg-white p-3 pb-8 shadow-xl rotate-2 max-w-xs mt-4 mb-8 transform hover:scale-105 transition-transform duration-500">
                    <div className="w-full aspect-square bg-gray-200 overflow-hidden mb-4">
                        <img src={current.rewardImage} alt="Memory" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-handwriting text-2xl text-center text-gray-700">Memory Unlocked!</p>
                </div>

                <div className="bg-white/60 p-4 rounded-xl backdrop-blur-sm mb-6 shadow-sm border border-white/50 max-w-xs text-center">
                    <p className="text-gray-700 italic">"{current.memory}"</p>
                </div>

                <CuteButton onClick={nextLevel} className="animate-bounce">
                    {level === levels.length - 1 ? "Finish Quest" : "Next Level"} <ArrowRight size={16} />
                </CuteButton>
            </div>
        );
    }

    // 4. Main Game Loop (Quiz or Find)
    const current = levels[level];
    return (
        <div className="h-full flex flex-col bg-white/50">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white/40">
                <span className={`text-xs font-bold ${theme.accent} uppercase tracking-wider`}>{current.title}</span>
                <span className={`text-xs ${theme.accentBg} ${theme.accent} px-2 py-1 rounded-full`}>{level + 1} / {levels.length}</span>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center justify-center overflow-y-auto">
                {current.type === 'find' ? (
                    <div className="text-center mb-4">
                        <span className="text-4xl mb-2 block">🔍</span>
                        <h3 className="text-lg font-bold text-gray-700">{current.question}</h3>
                    </div>
                ) : (
                    <div className={`mb-6 p-4 bg-white rounded-2xl shadow-sm border ${theme.windowBorder} w-full max-w-xs text-center`}>
                        <span className="text-4xl mb-2 block">🧩</span>
                        <h3 className="font-bold text-gray-700 text-lg mb-2">{current.question}</h3>
                    </div>
                )}

                {/* Quiz Logic */}
                {current.type === 'quiz' && (
                    <form onSubmit={handleQuizSubmit} className="w-full max-w-[240px] flex flex-col gap-4">
                        <p className="text-xs text-center text-gray-400 italic">{current.hint}</p>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:${theme.windowBorder} outline-none text-center bg-white/80 backdrop-blur-sm shadow-inner text-gray-700 font-bold`}
                            placeholder="Your answer..."
                            autoFocus
                        />
                        {error && <p className="text-rose-500 text-xs text-center font-bold animate-pulse">{error}</p>}
                        <CuteButton className="w-full shadow-lg">Submit Answer</CuteButton>
                    </form>
                )}

                {/* Hidden Object Logic */}
                {current.type === 'find' && (
                    <div className="grid grid-cols-5 gap-3 p-4 bg-gray-100/50 rounded-2xl shadow-inner border border-white">
                        {Array.from({ length: current.gridSize }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    if (i === current.targetIndex) { setGameState('reward'); }
                                    else { setError("Not that one!"); setTimeout(() => setError(""), 1000); }
                                }}
                                className={`w-10 h-10 flex items-center justify-center text-2xl hover:scale-125 transition-transform bg-white rounded-lg shadow-sm border border-gray-100 hover:${theme.windowBorder}`}
                            >
                                {i === current.targetIndex ? theme.icon : '💔'}
                            </button>
                        ))}
                    </div>
                )}
                {current.type === 'find' && error && <p className="text-rose-500 text-xs text-center font-bold mt-4 animate-pulse">{error}</p>}
            </div>
        </div>
    );
};

// --- Static App Definitions ---

const PumpkinApp = () => (
    <div className="w-full h-full bg-black flex flex-col">
        <iframe
            src="https://my-pumpkin.netlify.app/"
            className="w-full flex-grow border-none"
            title="My Pumpkin"
        />
    </div>
);

const APP_DATA = [
    { id: 'notes', title: 'Love Note', icon: FileText, color: 'text-yellow-500', bg: 'bg-yellow-100', component: NotesApp, initialPos: { x: 50, y: 50 } },
    { id: 'gallery', title: 'Us Gallery', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-100', component: GalleryApp, initialPos: { x: 100, y: 80 } },
    { id: 'music', title: 'Music', icon: Music, color: 'text-purple-500', bg: 'bg-purple-100', component: MusicApp, initialPos: { x: 400, y: 100 } },
    { id: 'coupons', title: 'Coupons', icon: Gift, color: 'text-red-500', bg: 'bg-red-100', component: CouponApp, initialPos: { x: 150, y: 150 } },
    { id: 'chat', title: 'Our Chat', icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-100', component: ChatApp, initialPos: { x: 500, y: 50 } },
    { id: 'snake', title: 'Snake Game', icon: Cpu, color: 'text-orange-500', bg: 'bg-orange-100', component: SnakeGameApp, initialPos: { x: 200, y: 120 } },
    { id: 'browser', title: 'Why I Love U', icon: Globe, color: 'text-indigo-500', bg: 'bg-indigo-100', component: BrowserApp, initialPos: { x: 60, y: 60 }, width: "w-[90vw] md:w-[600px]" },
    { id: 'quest', title: 'Love Quest', icon: Map, color: 'text-rose-500', bg: 'bg-rose-100', component: LoveQuestApp, initialPos: { x: 250, y: 100 }, width: "w-[90vw] md:w-[550px]" },
    { id: 'recycle', title: 'Recycle Bin', icon: Trash2, color: 'text-gray-500', bg: 'bg-gray-200', component: RecycleBinApp, initialPos: { x: 300, y: 200 } },
    { id: 'pumpkin', title: 'My Pumpkin', icon: Heart, color: 'text-orange-500', bg: 'bg-orange-100', component: PumpkinApp, initialPos: { x: 150, y: 150 }, width: "w-[90vw] md:w-[800px]" },
    { id: 'crash', title: "Don't Click", icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-100', component: null, initialPos: { x: 600, y: 400 }, isAction: true }, // Special case for BSOD
];

// --- Main Desktop ---

const LoveOS = () => {
    const { theme, toggleTheme } = useTheme();
    const [wallpaper, setWallpaper] = useState(0);
    const [locked, setLocked] = useState(true);
    const [password, setPassword] = useState("");
    const [bsod, setBsod] = useState(false);

    const [windows, setWindows] = useState([]);
    const [activeId, setActiveId] = useState(null);

    // Desktop Icons State (Draggable)
    const [desktopIcons, setDesktopIcons] = useState([]);
    const [draggingIcon, setDraggingIcon] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Initialize icons in a grid
    useEffect(() => {
        const initialIcons = APP_DATA.map((app, index) => ({
            id: app.id,
            x: 30 + (index % 4) * 110,
            y: 40 + Math.floor(index / 4) * 130,
        }));
        setDesktopIcons(initialIcons);
    }, []);

    const openApp = (appId) => {
        const app = APP_DATA.find(a => a.id === appId);
        if (!app) return;

        if (app.isAction) {
            if (app.id === 'crash') setBsod(true);
            return;
        }

        if (windows.find(w => w.id === app.id)) {
            setActiveId(app.id);
        } else {
            // Default sizes based on app type or generic default
            let defaultWidth;
            let defaultHeight;

            // Handle legacy width overrides from APP_DATA
            if (app.width) {
                // Try to parse parsing "w-[...] md:w-[...]" strings roughly or just set defaults
                // Since we are moving to state-based size, let's just set good defaults
            }

            defaultWidth = 400;
            defaultHeight = 500;

            if (app.id === 'quest') { defaultWidth = 550; defaultHeight = 600; }
            if (app.id === 'browser') { defaultWidth = 600; defaultHeight = 500; }
            if (app.id === 'snake') { defaultWidth = 350; defaultHeight = 400; }
            if (app.id === 'notes') { defaultWidth = 320; defaultHeight = 450; }

            setWindows([...windows, {
                ...app,
                zIndex: windows.length + 1,
                pos: app.initialPos,
                size: { width: defaultWidth, height: defaultHeight }
            }]);
            setActiveId(app.id);
        }
    };

    const closeWindow = (id) => setWindows(windows.filter(w => w.id !== id));

    const updateWindowPos = (id, pos) => {
        setWindows(windows.map(w => w.id === id ? { ...w, pos } : w));
    };

    const updateWindowSize = (id, size) => {
        setWindows(windows.map(w => w.id === id ? { ...w, size } : w));
    };

    // Icon Drag Handlers
    const handleIconMouseDown = (e, id) => {
        e.stopPropagation(); // Prevent clicking through to wallpaper
        const icon = desktopIcons.find(i => i.id === id);
        setDraggingIcon(id);
        setDragOffset({
            x: e.clientX - icon.x,
            y: e.clientY - icon.y
        });
    };

    useEffect(() => {
        const handleIconMouseMove = (e) => {
            if (draggingIcon) {
                setDesktopIcons(prev => prev.map(icon => {
                    if (icon.id === draggingIcon) {
                        return {
                            ...icon,
                            x: e.clientX - dragOffset.x,
                            y: e.clientY - dragOffset.y
                        };
                    }
                    return icon;
                }));
            }
        };

        const handleIconMouseUp = () => {
            setDraggingIcon(null);
        };

        if (draggingIcon) {
            window.addEventListener('mousemove', handleIconMouseMove);
            window.addEventListener('mouseup', handleIconMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleIconMouseMove);
            window.removeEventListener('mouseup', handleIconMouseUp);
        };
    }, [draggingIcon, dragOffset]);


    // --- Screens ---

    if (bsod) {
        return (
            <div
                className="fixed inset-0 bg-rose-400 text-white font-mono p-8 flex flex-col items-center justify-center cursor-none z-[9999]"
                onClick={() => setBsod(false)}
            >
                <div className="text-8xl mb-8 animate-bounce">🥺</div>
                <h1 className="text-3xl font-bold mb-4 bg-white text-rose-500 px-4 py-1 rounded">SYSTEM OVERLOAD</h1>
                <p className="text-center max-w-lg mb-8 opacity-90 text-lg leading-relaxed">
                    Your computer ran into a problem because it couldn't handle how much I love you.
                    <br />We're just collecting some error info (100% complete) and then we'll restart for a hug.
                </p>
                <div className="bg-rose-500/50 p-6 rounded-xl text-sm border border-white/20 shadow-xl backdrop-blur-sm">
                    <p>Stop Code: TOO_MUCH_AFFECTION</p>
                    <p>Status: MY_HEART_IS_YOURS</p>
                    <div className="w-full bg-white/20 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-white animate-pulse"></div>
                    </div>
                </div>
                <p className="mt-10 text-sm animate-pulse">(Click anywhere to restart)</p>
            </div>
        );
    }

    if (locked) {
        return (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-2xl flex flex-col items-center justify-center text-white z-50 transition-all duration-1000">
                <FloatingParticles />
                <VineBorder />

                <div className="mb-10 flex flex-col items-center z-10 relative">
                    <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,255,255,0.4)] ring-4 ring-white/30 animate-pulse">
                        <Unlock size={48} className="text-white drop-shadow-md" />
                    </div>
                    <h1 className="text-5xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-100 drop-shadow-sm">Love OS</h1>
                    <p className="text-pink-100 text-lg font-medium tracking-wide">Enter the password to my heart</p>
                </div>

                <form
                    onSubmit={(e) => { e.preventDefault(); if (password.toLowerCase() === "love") setLocked(false); else alert("Hint: It's 'love'"); }}
                    className="flex flex-col gap-4 w-72 z-10 relative"
                >
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter 'love'..."
                        className="w-full px-8 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 text-center text-white placeholder-pink-100/70 outline-none focus:bg-white/30 transition-all shadow-xl text-lg tracking-widest"
                    />
                    <button className={`w-full py-4 rounded-full bg-gradient-to-r ${theme.primary} text-white font-bold shadow-lg transition-all transform active:scale-95 text-lg uppercase tracking-wider flex items-center justify-center gap-2`}>
                        <span>Log In</span> {theme.icon}
                    </button>
                    {/* Theme Toggle on Lock Screen for ease */}
                    <button type="button" onClick={toggleTheme} className="text-white/60 hover:text-white text-xs mt-4 flex items-center justify-center gap-2">
                        <RefreshCw size={12} /> Switch Theme
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className={`fixed inset-0 overflow-hidden transition-all duration-1000 ${theme.wallpaper[wallpaper % theme.wallpaper.length]}`}>
            <FloatingParticles />
            <VineBorder />

            {/* Top Bar */}
            <div className={`absolute top-0 w-full h-10 flex justify-between items-center px-6 text-gray-600 bg-white/20 backdrop-blur-md z-40 border-b border-white/20 shadow-sm transition-colors`}>
                <div className="flex items-center gap-4 text-sm font-medium">
                    <span className={`font-black flex items-center gap-2 ${theme.accent}`}>{theme.icon} LoveOS 3.0</span>
                </div>
                <div className="flex items-center gap-6 text-xs font-bold tracking-wide text-gray-500">
                    <button onClick={toggleTheme} className="hover:text-pink-600 transition-colors flex items-center gap-1 bg-white/30 px-3 py-1 rounded-full border border-transparent hover:border-pink-200">
                        {theme.id === 'plant' ? '🌹' : '🌿'} Switch to {theme.id === 'plant' ? 'Love' : 'Plant'}
                    </button>
                    <button onClick={() => setWallpaper((wallpaper + 1) % theme.wallpaper.length)} className="hover:text-pink-600 transition-colors flex items-center gap-1 bg-white/30 px-3 py-1 rounded-full">
                        <Sparkles size={12} /> Wallpaper
                    </button>
                    <span>100% ❤️</span>
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Desktop Area - Icons are now Absolute */}
            <div className="absolute inset-0 pt-10 pb-24 px-6 z-0">
                {desktopIcons.map(iconState => {
                    const app = APP_DATA.find(a => a.id === iconState.id);
                    if (!app) return null;

                    return (
                        <div
                            key={app.id}
                            onDoubleClick={() => openApp(app.id)}
                            onMouseDown={(e) => handleIconMouseDown(e, app.id)}
                            style={{ left: iconState.x, top: iconState.y }}
                            className="absolute flex flex-col items-center gap-3 group cursor-grab active:cursor-grabbing w-24 transition-transform hover:scale-105"
                        >
                            <div className={`w-16 h-16 rounded-[20px] ${app.bg} flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.05)] border-2 border-white/50 group-hover:shadow-[0_10px_25px_rgba(255,182,193,0.4)] transition-all pointer-events-none relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <app.icon size={30} className={`${app.color} drop-shadow-sm transform group-hover:-rotate-6 transition-transform duration-300`} />
                            </div>
                            <span className="text-gray-600 font-bold text-[11px] bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm pointer-events-none whitespace-nowrap overflow-hidden max-w-[100px] text-ellipsis border border-white/40">
                                {app.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Windows */}
            {windows.map(win => (
                <WindowFrame
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    position={win.pos}
                    size={win.size}
                    isActive={activeId === win.id}
                    onFocus={() => setActiveId(win.id)}
                    onClose={() => closeWindow(win.id)}
                    onMinimize={() => closeWindow(win.id)}
                    onMove={updateWindowPos}
                    onResize={updateWindowSize}
                >
                    {win.component ? <win.component onOpenApp={openApp} /> : null}
                </WindowFrame>
            ))}

            {/* Dock */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-24 px-6 rounded-[35px] bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center gap-4 transition-all hover:scale-[1.02] z-50 overflow-x-auto max-w-[90vw] ring-1 ring-white/40">
                {APP_DATA.filter(a => !a.isAction).map(app => (
                    <button
                        key={app.id}
                        onClick={() => openApp(app.id)}
                        className="group relative flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-4 shrink-0 p-2"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${app.bg} flex items-center justify-center shadow-lg group-hover:shadow-xl border border-white/60 group-hover:scale-110 transition-all duration-300 ease-out`}>
                            <app.icon size={26} className={app.color} />
                        </div>

                        {/* Tooltip */}
                        <span className="absolute -top-12 bg-gray-800 text-white text-[10px] font-bold py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-xl">
                            {app.title}
                        </span>

                        {/* Active Indicator */}
                        {windows.find(w => w.id === app.id) && (
                            <div className={`w-1.5 h-1.5 ${theme.id === 'plant' ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.5)]'} rounded-full mt-1`}></div>
                        )}
                    </button>
                ))}
                <div className="w-px h-10 bg-gray-400/20 mx-2"></div>
                <button
                    onClick={() => setLocked(true)}
                    className="w-14 h-14 rounded-2xl bg-gray-100/80 flex items-center justify-center hover:bg-white transition-all shadow-inner shrink-0 group hover:shadow-lg border border-transparent hover:border-white"
                >
                    <Unlock size={24} className="text-gray-400 group-hover:text-pink-500 transition-colors" />
                </button>
            </div>

        </div>
    );
};

const App = () => {
    const [currentTheme, setCurrentTheme] = useState(THEMES.love);

    const toggleTheme = () => {
        setCurrentTheme(prev => prev.id === 'love' ? THEMES.plant : THEMES.love);
    };
    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            <LoveOS />
        </ThemeContext.Provider>
    );
};

export default App;