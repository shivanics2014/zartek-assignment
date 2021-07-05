import { useState, useEffect, useRef } from "react";

export const TypingTest = ({testParagraph = ''}) => {
    // const [typedText, setTypedText] = useState('');
    // const [originalText, setOriginalText] = useState('');
    // const [showResult, setShowResult] = useState(false);
    const [disableTextField, setDisableTextField] = useState(false);
    const [errorCount, setErrorCount] = useState(0);
    const [wpmValue, setWpmValue] = useState(0);
    const textRef = useRef();

    useEffect(() => {
        resetTest();
    }, []);

    // useEffect(() => {
    //     setOriginalText(testParagraph);
    // }, [testParagraph])

    // const handleChangeText = (e) => {
    //     setTypedText(e.target.value);
    // }

    const resetTest = () => {
        setErrorCount(0);
        // setTypedText('');
        textRef.current.value = '';
        setWpmValue(0);
        setDisableTextField(false);
        setTimeout(() => {
            setDisableTextField(true);
            checkAndHighLightErrors();
        }, 1000 * 15);
    }

    const checkAndHighLightErrors = () => {
        let errorCounter = 0;
        const typedText = textRef.current.value;
        console.log('typedText ',typedText)
        for(let i=0; i<testParagraph.length; i++){
            if(typedText[i] !== testParagraph[i]){
                errorCounter += 1;
            }
        }
        setErrorCount(errorCounter);
        setWpmValue((typedText.length/5)/0.5);
    }

    return (
        <div style={{display:'flex', flex: 1, flexDirection: 'column'}}>
            <p>{testParagraph}</p>
            <input ref={textRef} disabled={disableTextField} type='textarea' />
            {
                errorCount > 0 && <p>{`${errorCount} letters mismatch`}</p>
            }
            <p>{`WPM for this test is ${wpmValue}`}</p>
            <button onClick={resetTest}>Try again</button>
        </div>
    );
}