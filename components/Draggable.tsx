import React, { useRef } from "react";
import { PanResponder, Animated, StyleSheet } from "react-native";

interface DraggableProps {
  initialX?: number;
  initialY?: number;
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({
  initialX = 0,
  initialY = 0,
  children,
}) => {
  // ref to store the position of the draggable element
  const pan = useRef(
    new Animated.ValueXY({ x: initialX, y: initialY })
  ).current;

  const panResponder = PanResponder.create({
    // assert if the pan responder should be activated
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    // store the offset when the user starts dragging
    onPanResponderGrant: () => {
      pan.extractOffset();
    },
    // reset the offset when the user releases the drag
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.draggable, { transform: pan.getTranslateTransform() }]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  draggable: {
    position: "absolute",
    zIndex: 9999,
  },
});

export default Draggable;
