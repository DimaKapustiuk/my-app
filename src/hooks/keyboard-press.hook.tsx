import { useEffect, useState } from "react";
import { KeyPressEnum } from "../enums/key-press.enum";
import { NUMPAD_ADD, NUMPAD_SUBTRACT, PRESS_ARROW_DOWN, PRESS_ARROW_LEFT, PRESS_ARROW_RIGHT, PRESS_ARROW_SPACE, PRESS_ARROW_UP } from "../redux/types";

export function useKeyboardPress() {
  const [ keyPressProps, setKeyPressProps ] = useState<{
    type: string,
    keyCode: string
  }>({ type: '', keyCode: '' });
  
  const downHandler = (event: KeyboardEvent) => {
    const { code } = event;

    switch(code) {
      case KeyPressEnum.ARROW_LEFT: {
        setKeyPressProps({
          type: PRESS_ARROW_LEFT,
          keyCode: KeyPressEnum.ARROW_LEFT
        });
        break;
      }

      case KeyPressEnum.ARROW_RIGHT: {
        setKeyPressProps({
          type: PRESS_ARROW_RIGHT,
          keyCode: KeyPressEnum.ARROW_RIGHT
        });
        break;
      }

      case KeyPressEnum.ARROW_UP: {
        setKeyPressProps({
          type: PRESS_ARROW_UP,
          keyCode: KeyPressEnum.ARROW_UP
        });
        break;
      }

      case KeyPressEnum.ARROW_DOWN: {
        setKeyPressProps({
          type: PRESS_ARROW_DOWN,
          keyCode: KeyPressEnum.ARROW_DOWN
        });
      
        break;
      }

      case KeyPressEnum.SPACE: {
        setKeyPressProps({
          type: PRESS_ARROW_SPACE,
          keyCode: KeyPressEnum.SPACE
        });
        break;
      }

      case KeyPressEnum.NUMPAD_SUBTRACT: {
        setKeyPressProps({
          type: NUMPAD_SUBTRACT,
          keyCode: KeyPressEnum.NUMPAD_SUBTRACT
        });
        break;
      }
      case KeyPressEnum.NUMPAD_ADD: {
        setKeyPressProps({
          type: NUMPAD_ADD,
          keyCode: KeyPressEnum.NUMPAD_ADD
        });
        break;
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return keyPressProps;
}
