import react from 'react';

export default function Footer () {
    return ( <>
           <div 
                className="terminal-status-footer" 
                style={{
                    position: 'absolute', 
                    bottom: '10px', 
                    left: '20px', 
                    right: '20px', 
                    fontSize: '0.8em', 
                    textAlign: 'center', 
                    color: 'var(--fallout-shadow)' 
                }}
            >
                {'> STATUS: ONLINE | VERSION 4.1 | DATA MOCKING ACTIVE <'}
            </div>
    
    </>
           
            );
     
}
