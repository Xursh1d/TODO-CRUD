import { InputControlSize, Text, TextArea as MyTextArea } from "@gravity-ui/uikit";


interface InputProps {
    label?: string;
    name: string;
    required?: boolean;
    size?: InputControlSize;
    placeholder?: string;
    validationError?: string;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    value?: string | null;
    defaultValue?: string | null;
    rightContent?: React.ReactNode;
}

export default function TextArea({
    label,
    name,
    required = false,
    size = "l",
    placeholder,
    validationError,
    onBlur,
    onChange,
    value,
    defaultValue,
}: InputProps) {
    const labelContent = label && (
        <>
            <Text variant="body-1" color="primary">
                {label}
            </Text>
            {required && <span className="text-rose-600 text-[15px] font-normal leading-tight">*</span>}
        </>
    );
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={name} className="flex items-center mb-2 leading-8 non-italic">
                    {labelContent}
                </label>
            )}
            <MyTextArea
                maxRows={5}
                minRows={2}
                id={name}
                size={size}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                defaultValue={defaultValue || ""}
                validationState={validationError ? "invalid" : undefined}
                errorMessage={validationError}
            />
        </div>
    )
}
