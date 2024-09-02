"use client";

import styled from "styled-components";

interface ToastProps {
  visible: boolean;
  message: string;
}

const Toast = ({ visible, message }: ToastProps) => {
  return <ToastContainer $visible={visible}>{message}</ToastContainer>;
};

export default Toast;

const ToastContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  width: 100%;
  height: 40px;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(72, 70, 70, 1);
  color: white;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: opacity 0.5s ease, visibility 0.5s ease;
  z-index: 10000;
`;
