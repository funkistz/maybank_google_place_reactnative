import { UserOutlined } from '@ant-design/icons';

function GPItem({ label }: any) {
    return (<>
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {label}
            <span>
                <UserOutlined /> 100
            </span>
        </div>
    </>);
}

export default GPItem;