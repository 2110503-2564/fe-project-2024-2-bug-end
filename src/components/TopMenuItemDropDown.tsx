'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuItem } from '@mui/material';

export default function TopMenuItemDropdown({ title, subItems }: { title: string, subItems: { label: string, href: string }[] }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // Toggle the menu open/close based on current state
        if (anchorEl) {
            setAnchorEl(null); // Close the menu if it's already open
        } else {
            setAnchorEl(event.currentTarget); // Open the menu if it's closed
        }
    };

    const handleClose = () => {
        setAnchorEl(null); // Close the menu when clicking outside or on a menu item
    };

    return (
        <div className="w-[120px] mt-auto mb-auto text-center cursor-pointer" onClick={handleClick}>
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
                        <MenuItem key={index} onClick={handleClose}>
                            <Link href={item.href} className="font-sans text-md text-gray-600 hover:text-cyan-600 hover:font-medium">
                                {item.label}
                            </Link>
                        </MenuItem>
                    ))}
                </Menu>
            )}
        </div>
    );
}
