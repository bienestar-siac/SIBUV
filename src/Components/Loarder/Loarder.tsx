// Material IU
import Box from '@mui/material/Box';

export default function Loader() {
    return (
      <Box sx={{ height: '100vh', width: '100%', textAlign: "center", background: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 className="loader"/>
      </Box>
    );
}