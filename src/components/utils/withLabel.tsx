import type { ComponentType, ReactNode } from "react";

export const withLabel = <TProps,>(WrappedComponent: ComponentType<TProps>) => {
  type WithLabelProps = TProps & { label?: ReactNode };
  const WithLabel: React.FC<WithLabelProps> = (props: WithLabelProps) => (
    <div>
      {props.label}
      <WrappedComponent {...props} />
    </div>
  );

  return WithLabel;
};
