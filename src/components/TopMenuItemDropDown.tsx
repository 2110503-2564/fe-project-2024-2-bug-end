'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuItem } from '@mui/material';

export default function TopMenuItemDropdown({ title, subItems }
: { 
    title: string, 
    subItems: { label: string, href: string }[] 
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div 
            className="w-[120px] mt-auto mb-auto text-center cursor-pointer" 
            onClick={handleClick}
        >
            <span className="font-sans text-md text-gray-600 hover:text-cyan-600 hover:font-medium">
                {title}
            </span>
            {subItems?.length > 0 && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    disableScrollLock={true}
                >
                    {subItems.map((item, index) => (
                            <Link 
                                href={item.href} 
                                key={index} 
                                className="font-sans text-md text-gray-600 hover:text-cyan-600 hover:font-medium"
                            >
                                <MenuItem onClick={handleClose}>
                                        {item.label}
                                </MenuItem>
                            </Link>
                    ))}
                </Menu>
            )}
        </div>
    );
}
