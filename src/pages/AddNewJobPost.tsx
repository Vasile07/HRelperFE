import React, {useState} from "react";
import styled from "styled-components";
import addPageDecorationImage from "../assets/add-page-decoration-image.jpg"
import type JobPost from "../model/JobPost.ts";

const AddPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    min-height: 0;
`;

const PageHeader = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px 20px;
    flex-shrink: 0;
`;

const HeaderText = styled.p`
    color: #000;
    font-size: 2.5rem;
    font-family: "Jomolhari", serif;
`;

const PageBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    min-height: 0;
    overflow: hidden;
`;

const ImageContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
`;

const DecorationImage = styled.img`
    height: 100%;
    width: auto;
    max-width: 500px;
    display: block;
`;

const FormContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0 0 0 50px;
    min-height: 0;
    overflow: hidden;
`;

const FormHeader = styled.div`
    flex-shrink: 0;
`;

const FormHeaderText = styled.p`
    color: #000;
    font-size: 2rem;
    font-family: "Jomolhari", serif;
`;

const FormBody = styled.div`
    display: flex;
    width: 70%;
    flex-direction: column;
    margin: 30px 0 0 30px;
    gap: 40px;
    font-size: 1.5rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding-right: 50px;
`;

const CustomDropdown = styled.select`
    width: 100%;
    background-color: #ffffff;
    color: #000;
    border-width: 0;
    border-bottom-width: 3px;
    font-size: 1.5rem;
    border-color: #000;
    padding: 0 15px;
`;

const CustomOption = styled.option`
    width: 100%;
    padding: 0 10px;
    border: #000 1px;
    font-size: 1rem;
`;

const CustomLabelHeader = styled.div`
    color: #000;
    padding: 0 15px 5px 15px;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-bottom: 3px solid #000;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const CustomLabelText = styled.p`
    flex: 1;
`;

const CustomList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: 160px;
    overflow-y: auto;
    margin-top: 10px;
    padding-right: 5px;
`;

const CustomListItem = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    background-color: rgb(216, 216, 216);
    padding: 3px 20px;
    border-radius: 10px;
`;

const SkillText = styled.p`
    color: #000;
    font-size: 20px;
    flex: 1;
`;

const SkillInputWrapper = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #000;
    background-color: #fff;
    margin: 10px auto;

    &:focus-within {
        border-bottom: 2px solid #344966;
    }
`;

const SkillInput = styled.input`
    flex: 1;
    border: none;
    outline: none;
    padding: 5px 15px;
    background-color: transparent;
    color: #000;
`;

const CustomButton = styled.button`
    border: none;
    background: transparent;
    font-size: 20px;
    cursor: pointer;
    padding: 0 10px;
    color: #000;
`;

const CustomTextArea = styled.textarea`
    width: 100%;
    background-color: transparent;
    color: #000;
    border: 3px solid #000;
    outline: none;
    height: 160px;
    resize: none;

    &:focus {
        border: 3px solid #000;
    }
`;

const TechPopup = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 250px;
`;

const TechPopupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border-bottom: 2px solid #000;
    background-color: #f5f5f5;
`;

const TechPopupTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    color: #000;
`;

const TechPopupList = styled.div`
    max-height: 300px;
    overflow-y: auto;
`;

const TechPopupItem = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    color: #000;
    font-size: 18px;
    border-bottom: 1px solid #e0e0e0;

    &:hover {
        background-color: #f5f5f5;
    }

    &:last-child {
        border-bottom: none;
    }
`;

const UploadButton = styled.button`
    width: fit-content;
    padding: 15px 60px;
    background-color: #344966;
    color: #FFF;
    position: sticky;
    align-self: flex-end;
    bottom: 0;
    border-radius: 30px;
    font-size: 30px;
    font-family: "Jomolhari", serif;
    cursor: pointer;
`;

const AddNewJobPost: React.FC = () => {

    const [skill, setSkill] = useState<string>("")
    const [guide, setGuide] = useState<string>("")
    const [showTechPopup, setShowTechPopup] = useState<boolean>(false);

    const allTechnologies = [
        {id: 1, name: "React"},
        {id: 2, name: "TypeScript"},
        {id: 3, name: "Node.js"},
        {id: 4, name: "Python"},
        {id: 5, name: "Docker"},
        {id: 6, name: "React"},
        {id: 7, name: "TypeScript"},
        {id: 8, name: "Node.js"},
        {id: 9, name: "Python"},
        {id: 10, name: "Docker"},
    ];

    const [jobPost, setJobPost] = useState<JobPost>({
        jobId: undefined,
        roleId: undefined,
        departmentId: undefined,
        description: "",
        skills: ["C#", "OOP", "devops"],
        technologies: [],
        guides: []
    });

    const updateField = <K extends keyof JobPost>(field: K, value: JobPost[K]) => {
        setJobPost(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const addTechnology = (tech: { id: number, name: string }) => {
        if (!jobPost.technologies.find(t => t.id === tech.id)) {
            updateField("technologies", [...jobPost.technologies, tech]);
        }
    };

    return (
        <AddPage>
            <PageHeader>
                <HeaderText>H</HeaderText>
                <HeaderText style={{color: "#344966"}}>R</HeaderText>
                <HeaderText>elper</HeaderText>
            </PageHeader>
            <PageBody>
                <ImageContainer>
                    <DecorationImage src={addPageDecorationImage}/>
                </ImageContainer>
                <FormContainer>
                    <FormHeader>
                        <FormHeaderText>Add new position</FormHeaderText>
                    </FormHeader>
                    <FormBody>
                        <CustomDropdown defaultValue={"JobTitle"}>
                            <CustomOption value={"JobTitle"}>Job Title</CustomOption>
                        </CustomDropdown>
                        <CustomDropdown defaultValue={"Department"}>
                            <CustomOption value={"JobTitle"}>Department</CustomOption>
                        </CustomDropdown>
                        <div>
                            <CustomLabelHeader style={{border: 0}}>
                                <CustomLabelText>
                                    Job description
                                </CustomLabelText>
                            </CustomLabelHeader>
                            <CustomTextArea
                                value={jobPost.description}
                                onChange={(e) => updateField("description", e.target.value)}
                            />
                        </div>
                        <div id={"must_have_skills_container"}>
                            <CustomLabelHeader>
                                <CustomLabelText>
                                    Must have skills
                                </CustomLabelText>
                            </CustomLabelHeader>
                            <SkillInputWrapper>
                                <SkillInput
                                    value={skill}
                                    onChange={e => setSkill(e.target.value)}
                                />
                                <CustomButton onClick={() => {
                                    updateField("skills", [skill, ...jobPost.skills])
                                    setSkill("");
                                }}>+</CustomButton>
                            </SkillInputWrapper>
                            <CustomList>
                                {
                                    jobPost.skills.map(skill => (
                                        <CustomListItem>
                                            <SkillText>
                                                {skill}
                                            </SkillText>
                                            <CustomButton
                                                onClick={() => updateField("skills", jobPost.skills.filter(s => s !== skill))}
                                            >x</CustomButton>
                                        </CustomListItem>
                                    ))
                                }
                            </CustomList>
                        </div>
                        <div id={"technologies_container"} style={{position: 'relative'}}>
                            <CustomLabelHeader>
                                <CustomLabelText>
                                    Technologies
                                </CustomLabelText>
                                <CustomButton
                                    style={{fontSize: 30}}
                                    onClick={() => setShowTechPopup(!showTechPopup)}
                                >
                                    +
                                </CustomButton>
                            </CustomLabelHeader>

                            {showTechPopup && (
                                <TechPopup>
                                    <TechPopupHeader>
                                        <TechPopupTitle>Select Technologies</TechPopupTitle>
                                        <CustomButton
                                            onClick={() => setShowTechPopup(false)}
                                            style={{fontSize: 24}}
                                        >
                                            ×
                                        </CustomButton>
                                    </TechPopupHeader>
                                    <TechPopupList>
                                        {allTechnologies
                                            .filter(tech => !jobPost.technologies.find(t => t.id === tech.id))
                                            .map(tech => (
                                                <TechPopupItem
                                                    key={tech.id}
                                                    onClick={() => addTechnology(tech)}
                                                >
                                                    {tech.name}
                                                </TechPopupItem>
                                            ))
                                        }
                                    </TechPopupList>
                                </TechPopup>
                            )}

                            <CustomList>
                                {
                                    jobPost.technologies.map(technology => (
                                        <CustomListItem key={technology.id}>
                                            <SkillText>
                                                {technology.name}
                                            </SkillText>
                                            <CustomButton
                                                onClick={() => updateField("technologies", jobPost.technologies.filter(t => t.id !== technology.id))}
                                            >x</CustomButton>
                                        </CustomListItem>
                                    ))
                                }
                            </CustomList>
                        </div>
                        <div>
                            <CustomLabelHeader>
                                <CustomLabelText>
                                    Interview Guide
                                </CustomLabelText>
                            </CustomLabelHeader>
                            <SkillInputWrapper>
                                <SkillInput
                                    value={guide}
                                    onChange={e => setGuide(e.target.value)}
                                />
                                <CustomButton onClick={() => {
                                    updateField("guides", [guide, ...jobPost.guides])
                                    setGuide("");
                                }}>+</CustomButton>
                            </SkillInputWrapper>
                            <CustomList>
                                {
                                    jobPost.guides.map(guide => (
                                        <CustomListItem>
                                            <SkillText>
                                                {guide}
                                            </SkillText>
                                            <CustomButton
                                                onClick={() => updateField("guides", jobPost.guides.filter(g => g !== guide))}
                                            >x</CustomButton>
                                        </CustomListItem>
                                    ))
                                }
                            </CustomList>
                        </div>
                        <UploadButton>UPLOAD</UploadButton>
                    </FormBody>
                </FormContainer>
            </PageBody>
        </AddPage>
    )
}

export default AddNewJobPost