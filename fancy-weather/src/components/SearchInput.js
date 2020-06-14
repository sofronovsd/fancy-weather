import React from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import localesJson from "../utils/localesJson";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";

export default function SearchInput({language, handleSearchClick, forecastSpeech}) {
    const [value, setValue] = React.useState('');
    const [recording, setRecording] = React.useState(false);
    const { listen, stop } = useSpeechRecognition({
      onResult: result => {
        setValue(result);
      }
    });
    const { speak, cancel, speaking } = useSpeechSynthesis();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSClick = () => {
        handleSearchClick(value);
    };

    const handleMicClick = () => {
      if (recording) {
        stop();
        const compareValue = value.trim().toLowerCase();
        switch (compareValue) {
          case 'погода': {
            handlePlayClick();
            break;
          }
          case 'прогноз': {
            handlePlayClick();
            break;
          }
          case 'weather': {
            handlePlayClick();
            break;
          }
          case 'forecast': {
            handlePlayClick();
            break;
          }
          default: {
            handleSClick();
          }
        }
      } else {
        listen();
      }
      setRecording(!recording)
    };

    const handlePlayClick = () => {
      if (!speaking) {
        speak(forecastSpeech)
      } else {
        cancel();
      }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSClick()
        }
    };

    const micClassName = `icon-mic ${recording ? 'icon-mic_active' : ''}`;
    const playClassName = `icon-play ${speaking ? 'icon-play_active' : ''}`;

    return (
        <div className="search-container">
            <InputGroup>
                <FormControl
                    placeholder={localesJson[language.toUpperCase()].searchPlaceholder}
                    className="search-input"
                    value={value}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <InputGroup.Append>
                    <Button
                      className="button"
                      variant="secondary"
                      onClick={handleMicClick}
                    >
                      <div className={micClassName}/>
                    </Button>
                    <Button
                      className="button"
                      variant="secondary"
                      onClick={handlePlayClick}
                    >
                      <div className={playClassName}/>
                    </Button>
                    <Button
                        className="button button_wide text text__search"
                        variant="secondary"
                        onClick={handleSClick}
                    >{localesJson[language.toUpperCase()].search}</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}
