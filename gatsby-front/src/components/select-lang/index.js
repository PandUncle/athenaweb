import React from "react";
import { useState } from "react";
import { Select, Popover, Button } from "antd";
// const { Option } = Select;
import "antd/dist/antd.css";

const getLangText = (lc) => {
    const item = (ic, txt) => {
        return (
            <span>
                <span>{ic}</span>
                <span style={{ marginLeft: "8px" }}>{txt}</span>
            </span>
        );
    };

    if (lc === "#cn") {
        return item("🇨🇳", "中文");
    } else if (lc == "#en") {
        return item("🇺🇸", "English");
    } else {
        return ""; //'🇨🇳 简体中文';
    }
};

export default function SelectLang(props) {
    const { color, borderColor, width, placement, lang, changeLang } = props;

    const [visible, setVisible] = useState(false);

    const items = () => {
        const lcs = ["#cn", "#en"];
        return lcs.map((lc, idx) => {
            return (
                <Button
                    key={idx}
                    ghost
                    style={{ color: "black", textAlign: "left" }}
                    onClick={() => {
                        changeLang(lc);
                        setVisible(false);
                    }}
                >
                    {getLangText(lc)}
                </Button>
            );
        });
    };

    return (
        <div>
            <Popover
                placement={placement ? placement : "bottom"}
                content={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {items()}
                    </div>
                }
                trigger="click"
                visible={visible}
                onVisibleChange={() => {
                    setVisible(!visible);
                }}
            >
                <Button
                    ghost
                    style={{
                        borderColor: borderColor ? borderColor : "#ffffff99",
                        color: color ? color : "#ffffffdd",
                        borderRadius: "8px",
                    }}
                >
                    {getLangText(lang)}
                </Button>
            </Popover>
        </div>
    );
}
