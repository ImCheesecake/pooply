-- Enable RLS
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PoopSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Trophy" ENABLE ROW LEVEL SECURITY;

-- Policies for User
CREATE POLICY "Enable read access for users to their own profile" ON "User"
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Enable insert access for users to their own profile" ON "User"
    FOR INSERT WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Enable update access for users to their own profile" ON "User"
    FOR UPDATE USING (auth.uid()::text = id);

-- Policies for PoopSession
CREATE POLICY "Enable read access for users to their own sessions" ON "PoopSession"
    FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Enable insert access for users to their own sessions" ON "PoopSession"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Enable update access for users to their own sessions" ON "PoopSession"
    FOR UPDATE USING (auth.uid()::text = "userId");

CREATE POLICY "Enable delete access for users to their own sessions" ON "PoopSession"
    FOR DELETE USING (auth.uid()::text = "userId");

-- Policies for Trophy
CREATE POLICY "Enable read access for users to their own trophies" ON "Trophy"
    FOR SELECT USING (auth.uid()::text = "userId");