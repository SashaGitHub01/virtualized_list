import React from "react";
import { useState } from "react";

const VirtualList = ({ rowRenderer, itemsCount, itemHeight }) => {
  const [wrapperEl, setWrapperEl] = useState();
  const [scrollTop, setScrollTop] = useState(0);

  const listHeight = itemsCount * itemHeight;
  const containerHeight = wrapperEl?.clientHeight;

  const start = Math.floor(scrollTop / itemHeight);
  const renderListLength = Math.ceil(containerHeight / itemHeight);
  const end = Math.min(itemsCount - 1, start + renderListLength);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const items = [];

  for (let i = start; i <= end; i++) {
    items.push(
      rowRenderer({
        index: i,
        style: {
          position: "absolute",
          width: "100%",
          top: `${i * itemHeight}px`,
        },
      })
    );
  }

  return (
    <div
      className="list_wrapper"
      style={{ overflowY: "scroll", height: "100%" }}
      ref={setWrapperEl}
      onScroll={handleScroll}
    >
      <div
        className="list"
        style={{
          height: `${listHeight}px`,
          position: "relative",
          background: "gray",
        }}
      >
        {items}
      </div>
    </div>
  );
};

export default VirtualList;
