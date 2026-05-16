CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(40) NOT NULL,
    organization VARCHAR(160) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE appliances (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(140) NOT NULL,
    zone VARCHAR(140) NOT NULL,
    power_rating_kw NUMERIC(10,3) NOT NULL,
    active BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE usage_logs (
    id UUID PRIMARY KEY,
    appliance_id UUID NOT NULL REFERENCES appliances(id),
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    duration_minutes BIGINT,
    units_consumed NUMERIC(12,4),
    estimated_cost NUMERIC(12,2)
);

CREATE TABLE reports (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    title VARCHAR(180) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_units NUMERIC(12,4) NOT NULL,
    predicted_bill NUMERIC(12,2) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE alerts (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    severity VARCHAR(40) NOT NULL,
    title VARCHAR(180) NOT NULL,
    message VARCHAR(500) NOT NULL,
    read BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE sessions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    jwt_id VARCHAR(120) NOT NULL,
    issued_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN NOT NULL
);
