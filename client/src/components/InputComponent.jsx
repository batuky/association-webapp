import Input from "antd/es/input/Input";
import Typography from "antd/es/typography/Typography";


export default function InputComponent(props) {
    return (
        <div>
            <Typography.Title level={5}>{props}</Typography.Title>
            <Input
                count={{
                    show: true,
                    max: 10,
                }}
                defaultValue="Hello, antd!"
            />
        </div>
    );
}