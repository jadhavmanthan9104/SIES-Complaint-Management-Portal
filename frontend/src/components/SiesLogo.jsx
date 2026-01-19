import React from 'react';

const SiesLogo = ({ className = "", imgClassName = "h-20" }) => {
    return (
        <div className={`rounded-lg overflow-hidden bg-white p-2 ${className}`}>
            <img src="/sies-logo-new.png" alt="SIES Logo" className={`${imgClassName} w-auto`} />
        </div>
    );
};

export default SiesLogo;
