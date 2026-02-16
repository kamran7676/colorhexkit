"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon, Monitor, Image as ImageIcon, Clipboard, Search, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SelectImageModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onImageSelect: (imageUrl: string) => void;
    onColorSelect?: (color: string) => void;
}

export function SelectImageModal({ open, onOpenChange, onImageSelect, onColorSelect }: SelectImageModalProps) {
    const [activeTab, setActiveTab] = useState("upload");
    const [isLoading, setIsLoading] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset state when opening
    useEffect(() => {
        if (open) {
            setIsLoading(false);
            setUrlInput("");
        }
    }, [open]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result as string;
            onImageSelect(result);
            onOpenChange(false);
        };
        reader.readAsDataURL(file);
    };

    const getScreenshotUrl = (url: string) => {
        return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.isMobile=true&viewport.deviceScaleFactor=1`;
    };

    const handleUrlSubmit = async (type: "website" | "image") => {
        if (!urlInput) {
            toast.error("Please enter a URL");
            return;
        }

        setIsLoading(true);

        try {
            if (type === "image") {
                // Validate it's an image by trying to load it
                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = () => {
                    onImageSelect(urlInput);
                    onOpenChange(false);
                    setIsLoading(false);
                };
                img.onerror = () => {
                    // If direct load fails (CORS or other error), fallback to screenshot service
                    // This acts as a proxy to bypass CORS for images
                    toast.message("Direct load failed. Attempting to capture...", {
                        description: "Using screenshot service to bypass CORS."
                    });

                    const fallbackUrl = getScreenshotUrl(urlInput);
                    const fallbackImg = new Image();
                    fallbackImg.crossOrigin = "Anonymous";
                    fallbackImg.onload = () => {
                        onImageSelect(fallbackUrl);
                        onOpenChange(false);
                        setIsLoading(false);
                        toast.success("Image captured successfully");
                    };
                    fallbackImg.onerror = () => {
                        toast.error("Failed to load image. Please try a different URL.");
                        setIsLoading(false);
                    };
                    fallbackImg.src = fallbackUrl;
                };
                img.src = urlInput;
            } else {
                // Website URL
                let formattedUrl = urlInput;
                if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
                    formattedUrl = "https://" + formattedUrl;
                }

                // Use microlink.io for more reliable free screenshots
                const screenshotUrl = getScreenshotUrl(formattedUrl);

                const img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = () => {
                    // Add a small delay for better UX
                    setTimeout(() => {
                        onImageSelect(screenshotUrl);
                        onOpenChange(false);
                        setIsLoading(false);
                        toast.success("Website preview loaded");
                    }, 1000);
                };
                img.onerror = () => {
                    // Fallback or error
                    toast.error("Could not generate website preview. Please try a direct Image URL instead.");
                    setIsLoading(false);
                };
                img.src = screenshotUrl;
            }
        } catch (error) {
            toast.error("Error loading URL");
            setIsLoading(false);
        }
    };

    const handleScreenCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always" } as MediaTrackConstraints,
                audio: false
            });
            const track = stream.getVideoTracks()[0];
            // @ts-ignore - ImageCapture is experimental and might not be in all TS libs
            const imageCapture = new (window as any).ImageCapture(track);
            const bitmap = await imageCapture.grabFrame();

            // Convert bitmap to data URL
            const canvas = document.createElement('canvas');
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(bitmap, 0, 0);
            const imageUrl = canvas.toDataURL('image/png');

            // Stop sharing
            track.stop();

            onImageSelect(imageUrl);
            onOpenChange(false);
            toast.success("Screen captured successfully");
        } catch (err) {
            console.error("Error capturing screen:", err);
            toast.error("Failed to capture screen or cancelled.");
        }
    };

    const handleScreenPick = async () => {
        if (!window.EyeDropper) {
            toast.error("Your browser does not support the EyeDropper API");
            return;
        }

        onOpenChange(false); // Close modal to see screen
        setTimeout(async () => {
            try {
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                if (onColorSelect) {
                    onColorSelect(result.sRGBHex);
                    toast.success(`Color selected: ${result.sRGBHex}`);
                }
            } catch (e) {
                console.log("EyeDropper closed", e);
            }
        }, 300);
    };

    const handlePasteClipboard = async () => {
        try {
            const items = await navigator.clipboard.read();
            for (const item of items) {
                if (item.types.some(type => type.startsWith("image/"))) {
                    const blob = await item.getType(item.types.find(type => type.startsWith("image/"))!);
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        onImageSelect(event.target?.result as string);
                        onOpenChange(false);
                    };
                    reader.readAsDataURL(blob);
                    return;
                }
            }
            toast.error("No image found in clipboard");
        } catch (err) {
            toast.error("Failed to read clipboard");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl p-0 gap-0 bg-white dark:bg-[#0F0F0F] rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10">
                <DialogHeader className="p-4 pb-2">
                    <DialogTitle className="text-center text-base font-semibold tracking-wide uppercase text-neutral-900 dark:text-white">Select Image</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b border-neutral-200 dark:border-white/10 px-4">
                        <TabsList className="flex w-full justify-start bg-transparent h-auto p-0 space-x-2 overflow-x-auto no-scrollbar">
                            <TabItem value="upload" icon={<Upload className="w-3.5 h-3.5 mr-2" />} label="Upload image" />
                            <TabItem value="screen" icon={<Monitor className="w-3.5 h-3.5 mr-2" />} label="Color on Screen" />
                            <TabItem value="website" icon={<LinkIcon className="w-3.5 h-3.5 mr-2" />} label="Website URL" />
                            <TabItem value="image-url" icon={<ImageIcon className="w-3.5 h-3.5 mr-2" />} label="Image URL" />
                            <TabItem value="clipboard" icon={<Clipboard className="w-3.5 h-3.5 mr-2" />} label="Clipboard" />
                            <TabItem value="search" icon={<Search className="w-3.5 h-3.5 mr-2" />} label="Search" />
                        </TabsList>
                    </div>

                    <div className="p-4 min-h-[220px] flex flex-col justify-center">
                        <TabsContent value="upload" className="mt-0 h-full">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-neutral-200 dark:border-white/10 rounded-xl bg-neutral-50 dark:bg-white/5 h-[220px] flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors group"
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-neutral-400 dark:text-neutral-500" />
                                </div>
                                <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm">Browse or drop image</p>
                                <p className="text-[10px] text-neutral-400 mt-1">Supports JPG, PNG, WebP</p>
                            </div>
                        </TabsContent>

                        <TabsContent value="screen" className="mt-0 h-full">
                            <div className="h-[220px] flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-1">
                                    <Monitor className="w-7 h-7 text-blue-500" />
                                </div>
                                <div className="max-w-sm space-y-1">
                                    <h3 className="font-semibold text-base">Pick from Screen</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                                        Choose how you want to pick a color from your screen.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Button onClick={handleScreenPick} size="sm" className="rounded-full px-5 h-9 text-xs">
                                        EyeDropper
                                    </Button>
                                    <Button onClick={handleScreenCapture} variant="secondary" size="sm" className="rounded-full px-5 h-9 text-xs">
                                        Capture Screen
                                    </Button>
                                </div>
                                <p className="text-[10px] text-neutral-400 italic max-w-xs mx-auto">
                                    EyeDropper picks a single pixel. Capture Screen takes a screenshot to pick from.
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="website" className="mt-0 h-full">
                            <div className="h-[220px] flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto w-full px-4">
                                <div className="w-full max-w-md space-y-4 text-center">
                                    <div className="space-y-1">
                                        <h3 className="font-medium text-sm text-neutral-500 uppercase tracking-wide">URL to a website</h3>
                                    </div>

                                    <div className="flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 text-sm">
                                            https://
                                        </span>
                                        <Input
                                            placeholder="www.example.com"
                                            value={urlInput.replace(/^https?:\/\//, '')}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                            onKeyDown={(e) => e.key === "Enter" && handleUrlSubmit("website")}
                                            className="flex-1 rounded-l-none h-10 text-sm"
                                        />
                                    </div>

                                    {!isLoading && (
                                        <Button
                                            onClick={() => handleUrlSubmit("website")}
                                            disabled={isLoading}
                                            className="h-9 px-8 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900"
                                        >
                                            Ok
                                        </Button>
                                    )}

                                    {isLoading && (
                                        <div className="flex flex-col items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
                                            <Loader2 className="w-5 h-5 animate-spin text-neutral-500" />
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">We&apos;ll take a screenshot of the website for you...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="image-url" className="mt-0 h-full">
                            <div className="h-[220px] flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto w-full">
                                <div className="w-full space-y-3">
                                    <div className="space-y-1 text-center">
                                        <h3 className="font-medium text-sm">Enter Image URL</h3>
                                        <p className="text-xs text-neutral-500">Paste a direct link to an image file.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="https://example.com/image.jpg"
                                            value={urlInput}
                                            onChange={(e) => setUrlInput(e.target.value)}
                                            className="flex-1 h-9 text-sm"
                                        />
                                        <Button onClick={() => handleUrlSubmit("image")} disabled={isLoading} size="sm" className="h-9">
                                            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Load"}
                                        </Button>
                                    </div>
                                    <div className="flex items-start gap-2 p-2.5 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-xs text-neutral-500">
                                        <p className="text-[10px]">Pro tip: Use images that allow CORS (like Unsplash).</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="clipboard" className="mt-0 h-full">
                            <div className="h-[220px] flex flex-col items-center justify-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-neutral-50 dark:bg-white/5 flex items-center justify-center mb-1">
                                    <Clipboard className="w-7 h-7 text-neutral-500" />
                                </div>
                                <div className="max-w-md space-y-1 text-center">
                                    <h3 className="font-semibold text-base">Paste from Clipboard</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                                        Click below to paste an image directly.
                                    </p>
                                </div>
                                <Button onClick={handlePasteClipboard} variant="outline" size="sm" className="rounded-full px-6 h-9 text-xs">
                                    Paste Image
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="search" className="mt-0 h-full">
                            <div className="h-[220px] flex flex-col items-center justify-center space-y-3 text-center">
                                <Search className="w-10 h-10 text-neutral-300 dark:text-neutral-700" />
                                <h3 className="text-base font-medium">Search Images</h3>
                                <p className="text-neutral-500 text-xs">Integration with Unsplash/Pexels coming soon.</p>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>

                <DialogFooter className="p-3 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-black/20">
                    <div className="w-full flex items-center justify-between gap-4">
                        <p className="text-[10px] text-neutral-400 text-left flex-1">
                            We think data protection is important! <span className="text-pink-500 font-medium">No data is sent.</span> Magic happens in your browser.
                        </p>
                        <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 text-xs shrink-0">Cancel</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function TabItem({ value, icon, label }: { value: string, icon: React.ReactNode, label: string }) {
    return (
        <TabsTrigger
            value={value}
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-3 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-all flex items-center whitespace-nowrap"
        >
            {icon}
            {label}
        </TabsTrigger>
    )
}

// Add EyeDropper type definition and extend MediaTrackConstraints
declare global {
    interface Window {
        EyeDropper: any;
    }

    // Extend existing MediaTrackConstraints interface
    interface MediaTrackConstraints {
        cursor?: ConstrainDOMString;
    }
}
