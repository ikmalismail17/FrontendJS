import { Typography } from '@mui/material';

const TitleAnimation = () => {
  return (
    <Typography
      variant="h6"
      noWrap
      className='typing-text'
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
      RivDepMon
    </Typography>
  );
};

export default TitleAnimation;
