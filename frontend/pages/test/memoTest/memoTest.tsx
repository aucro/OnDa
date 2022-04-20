import React from 'react';
import MemoFrame from 'component/memo/memoCommon/MemoFrame';

const memoTest = () => {

    return (
        <div>
            <MemoFrame width={400} height={500} content={"helloWorld"} header={"this is header"}/>

        </div>
    );
};

export default memoTest;