import React from 'react';

export function CategoryHeader({ catName }) {
    return (
            <h3 className="overview-main__header">
                {catName}
            </h3>
    );
}