import React, { useState } from 'react';

function AudioVideoInterface() {
    const [audioMuted, setAudioMuted] = useState(false);
    const [videoPaused, setVideoPaused] = useState(false);

    const toggleAudio = () => {
        setAudioMuted(!audioMuted);
    };

    const toggleVideo = () => {
        setVideoPaused(!videoPaused);
    };

    return (
        <div className="audio-video-interface">
            <div className="video-container">
                <video id="local-video" muted={videoPaused} autoPlay></video>
            </div>
            <div className="controls">
                <button onClick={toggleAudio}>
                    {audioMuted ? 'Unmute Audio' : 'Mute Audio'}
                </button>
                <button onClick={toggleVideo}>
                    {videoPaused ? 'Resume Video' : 'Pause Video'}
                </button>
                <button>End Meeting</button>
            </div>
        </div>
    );
}

export default AudioVideoInterface;
