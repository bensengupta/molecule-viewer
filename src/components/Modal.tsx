import { ReactNode, useRef } from 'react';

interface ModalProps {
  id: string;
  control: ReturnType<typeof useModal>;
  children: ReactNode;
}

export function useModal() {
  const modalRef = useRef<HTMLInputElement>(null);

  const hide = () => (modalRef.current!.checked = false);
  const show = () => (modalRef.current!.checked = true);

  return { modalRef, hide, show };
}

export default function Modal({ id, children, control }: ModalProps) {
  return (
    <>
      <input
        id={id}
        ref={control.modalRef}
        type="checkbox"
        className="modal-toggle"
      />
      <label className="modal" htmlFor={id}>
        <label className="modal-box" htmlFor="">
          {children}
        </label>
      </label>
    </>
  );
}
