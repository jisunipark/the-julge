import classNames from "classnames/bind";
import styles from "./Textarea.module.scss";

const cn = classNames.bind(styles);

export interface Textarea {
  label: string;
  title: string;
  textarea: {
    id: string;
    name: string;
  };
  value?: string;
  onChangeHandler?: any;
}

export default function Textarea({ label, title, textarea, value, onChangeHandler }: Textarea) {
  return (
    <div className={cn("inputBox", "textarea")}>
      <label htmlFor={label} className={cn("title")}>
        {title}
      </label>
      <textarea
        {...textarea}
        className={cn("desc")}
        placeholder="입력"
        value={value}
        onChange={onChangeHandler}
      ></textarea>
    </div>
  );
}
