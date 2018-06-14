import * as React from "react"
import * as RN from "react-native"

interface Props {
  fadeInDuration?: number
  fadeOutDuration?: number
  opacity?: number
  position?: "top" | "center" | "bottom"
  positionValue?: number
  style?: RN.ViewStyle
  textStyle?: RN.TextStyle
}

declare class Toast extends React.Component<Props, any> {
  close()
  show(text: string, duration?: number)
}

export default Toast
