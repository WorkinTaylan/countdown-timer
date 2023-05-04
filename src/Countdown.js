import React, { useState, useEffect, useRef } from 'react';
import intervalToDuration from 'date-fns/intervalToDuration';

const Countdown = () => {
    const initialDate = new Date();
    const [endDate, setEndDate] = useState(initialDate);
    const [timeDiff, setTimeDiff] = useState(null);
    const [input, setInput]=useState('');
    const timeDiffRef=useRef(null);
    const inputRef=useRef();

    const eventInputHandler = (e) => {
        const value = e.target.value;
        setInput(value)
        localStorage.setItem('input',value)
    }

    const onFocusButton=(e)=>{
        if(e.key==='Enter'){
            inputRef.current.focus()
        }
    }
    
    useEffect(() => {
        
        const storedInput=localStorage.getItem('input');
        setInput(storedInput)
        const IntervalId=setInterval(() =>{
            const currentDate = new Date();
            const diff = intervalToDuration({
                start: currentDate,
                end: endDate
        });
            const storedEndDate =localStorage.getItem('targetDate');
            storedEndDate?setEndDate(new Date(storedEndDate)):setEndDate(currentDate);
            
                setTimeDiff(diff);
                timeDiffRef.current=diff.seconds;
        },500);
            return ()=>clearInterval(IntervalId);
    }, [endDate,input]);

    const handleEndDateChange = (event) => {
        const value = event.target.value;
        const newEndDate = new Date(value);
        if (newEndDate < new Date()) {
            setEndDate(new Date());
            alert("Please select a further date")
        }
        else{
            setEndDate(newEndDate);
            localStorage.setItem('targetDate', newEndDate);
        }

    };

    return (
        <div className='flex flex-col py-10 cursor-pointer'>
            <div className='flex flex-col py-5 gap-5 mx-auto p-5 border-2 border-solid border-purple-400 hover:border-orange-400 rounded-2xl shadow-2xl'>  
                <h1 className='mx-auto font-title text-lg md:text-3xl'>Remaining time to {input}</h1>
                <div className='font-time text-base md:text-2xl flex flex-col md:flex-row gap-5 mx-auto text-center p-5'>
                    <div className='flex flex-col gap-3 border-2 rounded-xl shadow-xl border-solid p-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        <h2>{timeDiff ? timeDiff.years : 0}</h2>
                        <span>Years</span>
                    </div>
                    <div className='flex flex-col gap-3 border-2 rounded-xl shadow-xl border-solid p-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        <h2>{timeDiff ? timeDiff.months : 0}</h2>
                        <span>Months</span>
                    </div>
                    <div className='flex flex-col gap-3 border-2 rounded-xl shadow-xl border-solid p-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        <h2 className=''>{timeDiff ? timeDiff.days : 0}</h2>
                        <span>Days</span>
                    </div>
                    <div className='flex flex-col gap-3 border-2 rounded-xl shadow-xl boder-solid p-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        <h2>{timeDiff ? timeDiff.hours : 0}</h2>
                        <span>Hrs</span>
                    </div>
                    <div className='flex flex-col gap-3 border-2 rounded-xl shadow-xl boder-solid p-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        <h2 className='text-center'>{timeDiff ? timeDiff.minutes : 0}</h2>
                        <span>Mins</span>
                    </div>
                    <div className='flex flex-col gap-3 border-2 rounded-xl shadow-xl boder-solid p-5 bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500'>
                        <h2 ref={timeDiffRef}>{timeDiff ? timeDiff.seconds : 0}</h2>
                        <span>Secs</span>
                    </div>
                </div>
                <div className='font-time flex flex-col md:flex-row justify-between gap-3 p-3'>
                    <div className='flex flex-col md:flex-row gap-3'>
                        <h1 className='p-3'>Target Date:</h1>
                        <input
                            ref={inputRef}
                            className='border-2 border-solid rounded-lg border-black p-2'
                            id="endDateInput"
                            type="datetime-local"
                            onChange={handleEndDateChange}
                        />
                    </div>
                        <input
                        onKeyDown={onFocusButton}
                        className='w-1/3 border-2 border-solid border-red-400 rounded-lg p-1 '
                        type="text"
                        onChange={eventInputHandler}
                        placeholder='Put your target'
                        />
                </div>
            </div> 
        </div>
    );
};

export default Countdown;
