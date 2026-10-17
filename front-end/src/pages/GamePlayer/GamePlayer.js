import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './GamePlayer.module.scss';

const cx = classNames.bind(styles);

function GamePlayer() {
    const { gameId } = useParams();
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const buildUrl = `/games/${gameId}/Build`;
        const loaderUrl = `${buildUrl}/WebBuild.loader.js`;

        const config = {
            dataUrl: `${buildUrl}/WebBuild.data`,
            frameworkUrl: `${buildUrl}/WebBuild.framework.js`,
            codeUrl: `${buildUrl}/WebBuild.wasm`,
            streamingAssetsUrl: 'StreamingAssets',
            companyName: 'DefaultCompany',
            productName: gameId,
            productVersion: '1.0.0',
        };

        const script = document.createElement('script');
        script.src = loaderUrl;
        script.onload = () => {
            // eslint-disable-next-line no-undef
            createUnityInstance(canvas, config).catch(alert);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [gameId]);

    return (
        <div id="unity-container" className={cx('unity-desktop')}>
            <canvas id="unity-canvas" ref={canvasRef} className={cx('canvas')}></canvas>
            <div id="unity-loading-bar">
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
            </div>
        </div>
    );
}

export default GamePlayer;
