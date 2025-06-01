CREATE TABLE meetings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic TEXT NOT NULL,
    notes TEXT,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    timezone_meeting TEXT NOT NULL,
    meeting_link TEXT,
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE meetings ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES auth.users(id);