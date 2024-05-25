import styled from "styled-components";
import { IDropdown } from "../../interface";
import { useState } from "react";

const Dropdown = ({ onClickElement, title, elements }: IDropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickTitle = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <DropdownContainer>
      <Title onClick={handleClickTitle}>
        {title} <i />
      </Title>
      {isOpen && (
        <ElementContainer>
          {elements.map((element) => {
            return (
              <Element
                id={element}
                onClick={() => {
                  console.log(element);
                  onClickElement(element);
                }}
              >
                {element}
              </Element>
            );
          })}
        </ElementContainer>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div``;

const Title = styled.div``;

const ElementContainer = styled.div``;

const Element = styled.div``;
