import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const withFramerVariants = (Component, variants) => (props) => {
    const DecoratedComponent = (variants)
        ? motion.custom(Component)
        : Component;
    return <DecoratedComponent variants={variants} {...props}/>;
};

export { withFramerVariants };
