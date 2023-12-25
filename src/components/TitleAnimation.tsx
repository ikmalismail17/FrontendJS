import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';

const TypingAnimation = () => {
  const [typedText, setTypedText] = useState('');
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const targetText = 'RivDepMon';

    let typingInterval = setInterval(() => {
      setTypedText((prevText) => prevText + targetText[currentIndexRef.current]);

      currentIndexRef.current += 1;

      if (currentIndexRef.current === targetText.length) {
        clearInterval(typingInterval);

        // Reset the typing animation after a short delay (e.g., 1 second)
        setTimeout(() => {
          setTypedText('');
          currentIndexRef.current = 0;
          // Re-start typing animation
          typingIntervalFunc();
        }, 1000);
      }
    }, 500); // Adjust the typing speed (milliseconds)

    const typingIntervalFunc = () => {
      typingInterval = setInterval(() => {
        setTypedText((prevText) => prevText + targetText[currentIndexRef.current]);

        currentIndexRef.current += 1;

        if (currentIndexRef.current === targetText.length) {
          clearInterval(typingInterval);

          // Reset the typing animation after a short delay (e.g., 1 second)
          setTimeout(() => {
            setTypedText('');
            currentIndexRef.current = 0;
            // Re-start typing animation
            typingIntervalFunc();
          }, 1000);
        }
      }, 500); // Adjust the typing speed (milliseconds)
    };

    return () => {
      clearInterval(typingInterval);
    };
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <Typography
      variant="h6"
      noWrap
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        flexGrow: 1,
      }}
    >
      {typedText}
    </Typography>
  );
};

export default TypingAnimation;
