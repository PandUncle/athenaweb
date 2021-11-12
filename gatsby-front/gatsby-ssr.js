/* eslint-disable */
/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */

import React from "react";
import Provider from "./src/state/provider";

export const wrapRootElement = ({ element }) => {
    return <Provider>{element}</Provider>;
};
