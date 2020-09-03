import React from 'react';

const Rank = ({ name, entries, boxes }) => {
    return (
        <div className='pv3 ph6 mw9 dib br4 shadow-5'>
            <div className='pt1 white f3'>
                {`${name}, your total recognized faces is`}
            </div>
            <div className='black f1 mt3'>
                {`${entries} faces`}
            </div>
            <div className='pt1 white f3'>
                {
                    boxes
                        ? boxes.length === 1
                            ? `${boxes.length} face found in the picture`
                            : `${boxes.length} faces found in the picture`
                        : '0 faces found in the picture'
                }
            </div>
        </div>
    );
}

export default Rank;