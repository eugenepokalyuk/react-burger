import React, { useState, useEffect, FormEvent, FC } from "react";
import {
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfileDetails.module.css";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../utils/api";
export const ProfileDetails: FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [change, setChange] = useState<boolean>(false);
    const [, setError] = useState<string>("");

    useEffect(() => {
        setName(localStorage.getItem("userName") || "");
        setEmail(localStorage.getItem("userEmail") || "");
        setPassword(localStorage.getItem("userPassword") || "");
    }, []);


    const handleReset = () => {
        setName(localStorage.getItem("userName") || "");
        setEmail(localStorage.getItem("userEmail") || "");
        setPassword(localStorage.getItem("userPassword") || "");
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUser(name, email, password)
            .then((res) => {
                navigate("/profile", { replace: true });
            })
            .catch((error) => {
                setError("Ой, произошла ошибка!");
            });
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className={`${styles.content} ${styles.contentHeight}`}
            >
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={(e) => {
                        setChange(true);
                        setName(e.target.value);
                    }}
                    icon={"EditIcon"}
                    name={"name"}
                    value={name}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mb-6"
                />

                <Input
                    type={"text"}
                    placeholder={"Логин"}
                    onChange={(e) => {
                        setChange(true);
                        setEmail(e.target.value);
                    }}
                    icon={"EditIcon"}
                    name={"login"}
                    value={email}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mb-6"
                />

                <Input
                    type={"password"}
                    placeholder={"Пароль"}
                    onChange={(e) => {
                        setChange(true);
                        setPassword(e.target.value);
                    }}
                    icon={"EditIcon"}
                    name={"password"}
                    value={password}
                    error={false}
                    errorText={"Ошибка"}
                    size={"default"}
                    extraClass="mb-6"
                />

                {change && (
                    <div className={`${styles.text_align_buttons}`}>
                        <Button
                            onClick={() => handleReset()}
                            htmlType="reset"
                            type="secondary"
                            size="medium"
                            extraClass="mr-5"
                        >
                            Отмена
                        </Button>

                        <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                )}
            </form>
        </div>
    )
}
