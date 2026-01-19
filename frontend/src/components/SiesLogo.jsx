import React from 'react';

const SiesLogo = ({ className = "" }) => {
    return (
        <div className={`absolute top-6 left-6 z-50 ${className}`}>
            <img src="/sies-logo.jpg" alt="SIES Logo" className="h-24 w-auto mix-blend-multiply" />
        </div>
    );
};

export default SiesLogo;
