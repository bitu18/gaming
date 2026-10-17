import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';
import classNames from 'classnames';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.defaultImage, ...props }, ref) => {
    const [fallback, setfallback] = useState('');

    const handleError = () => {
        setfallback(customFallback);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;
